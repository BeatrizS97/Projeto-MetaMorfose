// middleware/auth.js - Autenticação e gerenciamento de cookies
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { ERRORS } = require('../utils/constants');
const { clearCsrfCookie } = require('./csrf');

/**
 * Middleware para verificar autenticação via JWT do cookie
 */
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: ERRORS.NO_TOKEN_PROVIDED });
  }

  jwt.verify(
    token,
    config.JWT_SECRET,
    {
      algorithms: ['HS256'],
      issuer: config.JWT_ISSUER,
      audience: config.JWT_AUDIENCE,
    },
    (err, user) => {
    if (err) {
      return res.status(403).json({ error: ERRORS.INVALID_TOKEN });
    }
    req.userId = user.id;
    next();
    }
  );
};

/**
 * Função para definir cookie de autenticação de forma segura
 * @param {Object} res - Response object do Express
 * @param {string} token - JWT token
 */
const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,                    // Protege contra XSS
    secure: config.SECURE_COOKIE,      // true apenas em HTTPS (produção)
    sameSite: 'strict',                // Protege contra CSRF (mais rigoroso)
    maxAge: 24 * 60 * 60 * 1000,       // 24 horas
    path: '/',                         // Cookie válido para toda a aplicação
    signed: false,                     // Não assinado (JWT já é válido)
  });
};

/**
 * Função para limpar cookie de autenticação
 * @param {Object} res - Response object do Express
 */
const clearAuthCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: config.SECURE_COOKIE,
    sameSite: 'strict',
    path: '/',
  });

  clearCsrfCookie(res);
};

module.exports = {
  authenticateToken,
  setAuthCookie,
  clearAuthCookie,
};
