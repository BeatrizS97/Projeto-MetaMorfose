// middleware/validation.js - Validações reutilizáveis
const { body } = require('express-validator');
const { CONSTRAINTS, GOAL_CATEGORIES, GOAL_PERIODS, EMAIL_REGEX } = require('../utils/constants');

const SAFE_AVATAR_REGEX = /^(https:\/\/|data:image\/(png|jpeg|jpg|webp);base64,)/i;

module.exports = {
  // Validações de registro
  registerValidation: [
    body('email')
      .trim()
      .toLowerCase()
      .matches(EMAIL_REGEX)
      .withMessage('Email inválido'),
    body('password')
      .isLength({ min: CONSTRAINTS.password.minLength })
      .withMessage(`Senha deve ter no mínimo ${CONSTRAINTS.password.minLength} caracteres`)
      .isLength({ max: CONSTRAINTS.password.maxLength })
      .withMessage(`Senha não pode ter mais de ${CONSTRAINTS.password.maxLength} caracteres`),
    body('name')
      .notEmpty()
      .trim()
      .isLength({ min: CONSTRAINTS.name.minLength })
      .withMessage(`Nome deve ter no mínimo ${CONSTRAINTS.name.minLength} caracteres`)
      .isLength({ max: CONSTRAINTS.name.maxLength })
      .withMessage(`Nome não pode ter mais de ${CONSTRAINTS.name.maxLength} caracteres`),
    body('consentLGPD')
      .equals('true')
      .withMessage('Você deve concordar com a Política de Privacidade'),
  ],

  // Validações de login
  loginValidation: [
    body('email')
      .trim()
      .toLowerCase()
      .matches(EMAIL_REGEX)
      .withMessage('Email inválido'),
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatória'),
  ],

  // Validações de recuperação de senha
  forgotPasswordValidation: [
    body('email')
      .trim()
      .toLowerCase()
      .matches(EMAIL_REGEX)
      .withMessage('Email inválido'),
  ],

  // Validações de meta
  createGoalValidation: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Título é obrigatório')
      .isLength({ max: CONSTRAINTS.title.maxLength })
      .withMessage(`Título não pode ter mais de ${CONSTRAINTS.title.maxLength} caracteres`),
    body('description')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ max: CONSTRAINTS.description.maxLength })
      .withMessage(`Descrição não pode ter mais de ${CONSTRAINTS.description.maxLength} caracteres`),
    body('category')
      .isIn(GOAL_CATEGORIES)
      .withMessage(`Categoria deve ser uma de: ${GOAL_CATEGORIES.join(', ')}`),
    body('period')
      .optional()
      .isIn(GOAL_PERIODS)
      .withMessage(`Período deve ser um de: ${GOAL_PERIODS.join(', ')}`),
  ],

  // Validações de atualização de meta
  updateGoalValidation: [
    body('title')
      .optional()
      .trim()
      .isLength({ max: CONSTRAINTS.title.maxLength })
      .withMessage(`Título não pode ter mais de ${CONSTRAINTS.title.maxLength} caracteres`),
    body('description')
      .optional()
      .trim()
      .isLength({ max: CONSTRAINTS.description.maxLength })
      .withMessage(`Descrição não pode ter mais de ${CONSTRAINTS.description.maxLength} caracteres`),
    body('category')
      .optional()
      .isIn(GOAL_CATEGORIES)
      .withMessage(`Categoria deve ser uma de: ${GOAL_CATEGORIES.join(', ')}`),
    body('period')
      .optional()
      .isIn(GOAL_PERIODS)
      .withMessage(`Período deve ser um de: ${GOAL_PERIODS.join(', ')}`),
    body('completed')
      .optional()
      .isBoolean()
      .withMessage('Completed deve ser um booleano'),
    body('order')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Order deve ser um inteiro maior ou igual a zero'),
  ],

  // Validações de perfil
  updateProfileValidation: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: CONSTRAINTS.name.minLength })
      .withMessage(`Nome deve ter no mínimo ${CONSTRAINTS.name.minLength} caracteres`)
      .isLength({ max: CONSTRAINTS.name.maxLength })
      .withMessage(`Nome não pode ter mais de ${CONSTRAINTS.name.maxLength} caracteres`),
    body('email')
      .optional()
      .trim()
      .toLowerCase()
      .matches(EMAIL_REGEX)
      .withMessage('Email inválido'),
    body('avatar')
      .optional({ nullable: true })
      .isString()
      .custom((value) => {
        if (!value) return true;
        return SAFE_AVATAR_REGEX.test(value);
      })
      .withMessage('Avatar deve ser URL HTTPS ou data URL de imagem segura')
      .isLength({ max: CONSTRAINTS.avatar.maxLength })
      .withMessage(`Avatar nao pode ter mais de ${CONSTRAINTS.avatar.maxLength} caracteres`),
  ],

  // Validações de alteração de senha
  changePasswordValidation: [
    body('currentPassword')
      .notEmpty()
      .withMessage('Senha atual é obrigatória'),
    body('newPassword')
      .isLength({ min: CONSTRAINTS.password.minLength })
      .withMessage(`Nova senha deve ter no mínimo ${CONSTRAINTS.password.minLength} caracteres`)
      .isLength({ max: CONSTRAINTS.password.maxLength })
      .withMessage(`Nova senha não pode ter mais de ${CONSTRAINTS.password.maxLength} caracteres`),
  ],

  // Validações de deleção de conta
  deleteAccountValidation: [
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatória'),
  ],

  // Validações de exportação de dados
  exportDataValidation: [
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatória para exportar dados'),
  ],
};
