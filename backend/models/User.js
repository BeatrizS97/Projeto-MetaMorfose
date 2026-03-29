// models/User.js
const mongoose = require('mongoose');
const { CONSTRAINTS, EMAIL_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    minlength: [CONSTRAINTS.name.minLength, 'Nome muito curto'],
    maxlength: [CONSTRAINTS.name.maxLength, 'Nome muito longo'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    maxlength: [CONSTRAINTS.email.maxLength, 'Email muito longo'],
    // Aceita TLDs modernos (.test, .technology, etc.) mantendo a estrutura basica de email.
    match: [EMAIL_REGEX, 'Email inválido'],
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [CONSTRAINTS.password.minLength, 'Senha muito curta'],
    maxlength: [CONSTRAINTS.password.maxLength, 'Senha muito longa'],
    select: false, // Não retorna senha por padrão
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // LGPD Consentimento (Artigo 7º e 8º)
  lgpdConsent: {
    given: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: String,
      default: '1.0',
    },
    ipAddress: String,
    userAgent: String,
  },
  consentMarketing: {
    type: Boolean,
    default: false,
  },
  consentAnalytics: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
    maxlength: [CONSTRAINTS.avatar.maxLength, 'Avatar muito grande'],
  },
});

// Middleware para atualizar updatedAt
userSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('User', userSchema);
