// models/User.js
const mongoose = require('mongoose');
const { CONSTRAINTS } = require('../utils/constants');

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
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
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
});

// Middleware para atualizar updatedAt
userSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('User', userSchema);
