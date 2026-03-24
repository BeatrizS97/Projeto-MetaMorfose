// controllers/userController.js - Lógica de usuário/perfil
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Goal = require('../models/Goal');
const config = require('../config/env');
const { clearAuthCookie } = require('../middleware/auth');
const { ERRORS } = require('../utils/constants');
const { logAction } = require('../utils/auditLogger');

/**
 * Atualizar perfil do usuário
 */
exports.updateProfile = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email } = req.body;
    const updateData = {};

    // Atualizar nome se fornecido
    if (name) {
      updateData.name = name;
    }

    // Atualizar email se fornecido
    if (email) {
      const lowerEmail = email.toLowerCase();
      // Verificar se email já existe (e não é do usuário atual)
      const existingUser = await User.findOne({ email: lowerEmail });
      if (existingUser && existingUser._id.toString() !== req.userId) {
        return res.status(409).json({ error: ERRORS.EMAIL_ALREADY_IN_USE });
      }
      updateData.email = lowerEmail;
    }

    // Atualizar usuário
    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true });

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Alterar senha
 */
exports.changePassword = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    // Buscar usuário com senha
    const user = await User.findById(req.userId).select('+password');
    if (!user) {
      return res.status(404).json({ error: ERRORS.USER_NOT_FOUND });
    }

    // Verificar senha atual
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: ERRORS.CURRENT_PASSWORD_WRONG });
    }

    // Hash da nova senha
    user.password = await bcrypt.hash(newPassword, config.BCRYPT_ROUNDS);
    await user.save();

    // Log auditoria - Senha alterada
    await logAction(req, res, {
      action: 'PASSWORD_CHANGE',
      userId: req.userId,
      description: 'Senha do usuário alterada',
      lgpdRelevant: true,
    });

    res.json({
      success: true,
      message: 'Senha alterada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Deletar conta do usuário (com confirmação de senha)
 */
exports.deleteAccount = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  try {
    // Buscar usuário com senha
    const user = await User.findById(req.userId).select('+password');
    if (!user) {
      return res.status(404).json({ error: ERRORS.USER_NOT_FOUND });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: ERRORS.WRONG_PASSWORD });
    }

    // Deletar usuário e suas metas em paralelo
    await Promise.all([
      User.deleteOne({ _id: req.userId }),
      Goal.deleteMany({ userId: req.userId }),
    ]);

    // Log auditoria - Conta deletada
    await logAction(req, res, {
      action: 'ACCOUNT_DELETE',
      userId: req.userId,
      description: 'Conta do usuário deletada conforme solicitação LGPD',
      lgpdRelevant: true,
    });

    // Limpar cookie
    clearAuthCookie(res);

    res.json({
      success: true,
      message: 'Conta deletada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Exportar dados do usuário (LGPD - Direito de Acesso - Artigo 17)
 */
exports.exportUserData = async (req, res) => {
  try {
    // Buscar usuário
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: ERRORS.USER_NOT_FOUND });
    }

    // Buscar metas do usuário
    const goals = await Goal.find({ userId: req.userId }).lean();

    // Preparar dados para exportação
    const exportData = {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lgpdConsent: user.lgpdConsent,
        consentMarketing: user.consentMarketing,
        consentAnalytics: user.consentAnalytics,
      },
      goals: goals.map(goal => ({
        id: goal._id.toString(),
        title: goal.title,
        description: goal.description,
        category: goal.category,
        period: goal.period,
        completed: goal.completed,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
      })),
      exportDate: new Date(),
      exportVersion: '1.0',
    };

    // Log auditoria - Exportação de dados
    await logAction(req, res, {
      action: 'DATA_EXPORT',
      userId: req.userId,
      description: 'Dados do usuário exportados conforme solicitação LGPD',
      lgpdRelevant: true,
    });

    // Retornar dados como JSON
    res.json({
      success: true,
      data: exportData,
    });
  } catch (error) {
    console.error('Erro ao exportar dados:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};
