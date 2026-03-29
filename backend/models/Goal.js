// models/Goal.js
const mongoose = require('mongoose');
const { GOAL_CATEGORIES, GOAL_PERIODS, CONSTRAINTS } = require('../utils/constants');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    minlength: [CONSTRAINTS.title.minLength, 'Título muito curto'],
    maxlength: [CONSTRAINTS.title.maxLength, 'Título muito longo'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [CONSTRAINTS.description.maxLength, 'Descrição muito longa'],
    trim: true,
    default: '',
  },
  category: {
    type: String,
    enum: {
      values: GOAL_CATEGORIES,
      message: `Categoria deve ser uma de: ${GOAL_CATEGORIES.join(', ')}`,
    },
    required: [true, 'Categoria é obrigatória'],
    index: true, // Índice para filtros rápidos
  },
  period: {
    type: String,
    enum: {
      values: GOAL_PERIODS,
      message: `Período deve ser um de: ${GOAL_PERIODS.join(', ')}`,
    },
    default: 'month',
  },
  completed: {
    type: Boolean,
    default: false,
    index: true, // Índice para filtros rápidos
  },
  order: {
    type: Number,
    default: 0,
    min: 0,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId é obrigatório'],
    index: true, // Índice para buscas por usuário
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Índice para filtros por data
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para atualizar updatedAt
goalSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

// Índices compostos para queries frequentes
goalSchema.index({ userId: 1, category: 1 });
goalSchema.index({ userId: 1, completed: 1 });
goalSchema.index({ userId: 1, createdAt: -1 });
goalSchema.index({ userId: 1, category: 1, period: 1, order: 1 });

module.exports = mongoose.model('Goal', goalSchema);
