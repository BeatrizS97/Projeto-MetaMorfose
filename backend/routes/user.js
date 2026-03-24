// routes/user.js - Rotas de usuário/perfil
const express = require('express');
const userController = require('../controllers/userController');
const validationRules = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas de user requerem autenticação
router.use(authenticateToken);

/**
 * PUT /api/user/profile
 * Atualizar perfil do usuário
 */
router.put(
  '/profile',
  validationRules.updateProfileValidation,
  userController.updateProfile
);

/**
 * PUT /api/user/password
 * Alterar senha do usuário
 */
router.put(
  '/password',
  validationRules.changePasswordValidation,
  userController.changePassword
);

/**
 * DELETE /api/user/account
 * Deletar conta do usuário
 */
router.delete(
  '/account',
  validationRules.deleteAccountValidation,
  userController.deleteAccount
);

/**
 * GET /api/user/export
 * Exportar dados do usuário (LGPD - Artigo 17)
 */
router.get(
  '/export',
  userController.exportUserData
);

module.exports = router;
