// routes/auth.js - Rotas de autenticação
const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const validationRules = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');
const config = require('../config/env');

const router = express.Router();

/**
 * Rate limiter específico para login (mais restritivo)
 */
const loginLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: { error: 'Muitas tentativas de login. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Não limitar requisições em ambiente de desenvolvimento
    return config.NODE_ENV === 'development';
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: Math.max(3, Math.floor(config.RATE_LIMIT_MAX_REQUESTS / 2)),
  message: { error: 'Muitas tentativas de recuperação. Tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.NODE_ENV === 'development',
});

/**
 * POST /api/auth/register
 * Registrar novo usuário
 */
router.post(
  '/register',
  loginLimiter,
  validationRules.registerValidation,
  authController.register
);

/**
 * POST /api/auth/login
 * Fazer login
 */
router.post(
  '/login',
  loginLimiter,
  validationRules.loginValidation,
  authController.login
);

/**
 * POST /api/auth/forgot-password
 * Solicitar recuperação de senha
 */
router.post(
  '/forgot-password',
  forgotPasswordLimiter,
  validationRules.forgotPasswordValidation,
  authController.forgotPassword
);

/**
 * GET /api/auth/verify
 * Verificar se token é válido
 */
router.get('/verify', authenticateToken, authController.verify);

/**
 * POST /api/auth/logout
 * Fazer logout
 */
router.post('/logout', authenticateToken, authController.logout);

/**
 * GET /api/auth/csrf-token
 * Obter token CSRF para requests mutáveis
 */
router.get('/csrf-token', authController.csrfToken);

module.exports = router;
