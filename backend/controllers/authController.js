// controllers/authController.js - Lógica de autenticação
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('../config/env');
const { setAuthCookie, clearAuthCookie } = require('../middleware/auth');
const { ERRORS } = require('../utils/constants');
const { logAction } = require('../utils/auditLogger');

/**
 * Registrar novo usuário
 */
exports.register = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name } = req.body;

  try {
    // Verificar se email já existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: ERRORS.EMAIL_ALREADY_EXISTS });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, config.BCRYPT_ROUNDS);

    // Criar novo usuário
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      lgpdConsent: {
        given: true,
        date: new Date(),
        version: '1.0',
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    });

    await user.save();

    // Log auditoria - Novo usuário registrado
    await logAction(req, res, {
      action: 'AUTH_REGISTER',
      userId: user._id.toString(),
      description: 'Novo usuário registrado com consentimento LGPD',
      lgpdRelevant: true,
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id.toString() },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    // Definir cookie seguro
    setAuthCookie(res, token);

    // Retornar dados do usuário (sem senha)
    res.status(201).json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Fazer login
 */
exports.login = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Encontrar usuário
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: ERRORS.INVALID_CREDENTIALS });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: ERRORS.INVALID_CREDENTIALS });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id.toString() },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    // Log auditoria - Login bem-sucedido
    await logAction(req, res, {
      action: 'AUTH_LOGIN',
      userId: user._id.toString(),
      description: 'Login bem-sucedido',
      lgpdRelevant: true,
    });

    // Definir cookie seguro
    setAuthCookie(res, token);

    // Retornar dados do usuário (sem senha)
    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Verificar autenticação
 */
exports.verify = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: ERRORS.USER_NOT_FOUND });
    }

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Fazer logout
 */
exports.logout = async (req, res) => {
  try {
    // Log auditoria - Logout
    await logAction(req, res, {
      action: 'AUTH_LOGOUT',
      userId: req.userId,
      description: 'Logout realizado',
      lgpdRelevant: true,
    });

    clearAuthCookie(res);
    res.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    clearAuthCookie(res);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Solicitar recuperação de senha
 * Observação: resposta genérica para não vazar existência de e-mail.
 */
exports.forgotPassword = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    // Se existir usuário, registra auditoria. Em produção, aqui entraria envio de e-mail.
    if (user) {
      await logAction(req, res, {
        action: 'AUTH_FORGOT_PASSWORD',
        userId: user._id.toString(),
        description: 'Solicitação de recuperação de senha',
        lgpdRelevant: true,
      });
    }

    return res.json({
      success: true,
      message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    });
  } catch (error) {
    console.error('Erro em forgot password:', error);
    return res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};
