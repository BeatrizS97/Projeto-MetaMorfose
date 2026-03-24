// controllers/goalsController.js - Lógica de metas
const { validationResult } = require('express-validator');
const Goal = require('../models/Goal');
const { ERRORS } = require('../utils/constants');
const { logAction } = require('../utils/auditLogger');

/**
 * Obter metas do usuário com filtros opcionais
 */
exports.getGoals = async (req, res) => {
  try {
    const { category, completed, period } = req.query;

    // Construir filtro
    const filter = { userId: req.userId };
    if (category) filter.category = category;
    if (completed !== undefined) filter.completed = completed === 'true';
    if (period) filter.period = period;

    // Buscar metas com ordenação
    const goals = await Goal.find(filter)
      .sort({ createdAt: -1 })
      .lean(); // .lean() para melhor performance (retorna objetos simples)

    res.json({
      success: true,
      count: goals.length,
      goals,
    });
  } catch (error) {
    console.error('Erro ao buscar metas:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Criar nova meta
 */
exports.createGoal = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, period } = req.body;

    const newGoal = new Goal({
      title,
      description,
      category,
      period: period || 'month',
      userId: req.userId,
    });

    await newGoal.save();

    // Log auditoria - Meta criada
    await logAction(req, res, {
      action: 'GOAL_CREATE',
      userId: req.userId,
      affectedResource: 'Goal',
      affectedResourceId: newGoal._id,
      description: `Meta criada: "${title}"`,
    });

    res.status(201).json({
      success: true,
      goal: newGoal,
    });
  } catch (error) {
    console.error('Erro ao criar meta:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Atualizar meta existente
 */
exports.updateGoal = async (req, res) => {
  // Validação de erros do express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verificar se meta pertence ao usuário
    const goal = await Goal.findOne({ _id: id, userId: req.userId });
    if (!goal) {
      return res.status(404).json({ error: ERRORS.GOAL_NOT_FOUND });
    }

    // Atualizar apenas campos fornecidos
    Object.assign(goal, updateData);
    await goal.save();

    // Log auditoria - Meta atualizada
    await logAction(req, res, {
      action: 'GOAL_UPDATE',
      userId: req.userId,
      affectedResource: 'Goal',
      affectedResourceId: goal._id,
      description: `Meta atualizada: "${goal.title}"`,
    });

    res.json({
      success: true,
      goal,
    });
  } catch (error) {
    console.error('Erro ao atualizar meta:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Deletar meta
 */
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar meta primeiro para capturar informações
    const goal = await Goal.findOne({ _id: id, userId: req.userId });
    if (!goal) {
      return res.status(404).json({ error: ERRORS.GOAL_NOT_FOUND });
    }

    // Deletar apenas se pertencer ao usuário
    const result = await Goal.deleteOne({ _id: id, userId: req.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: ERRORS.GOAL_NOT_FOUND });
    }

    // Log auditoria - Meta deletada
    await logAction(req, res, {
      action: 'GOAL_DELETE',
      userId: req.userId,
      affectedResource: 'Goal',
      affectedResourceId: goal._id,
      description: `Meta deletada: "${goal.title}"`,
    });

    res.json({
      success: true,
      message: 'Meta deletada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar meta:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};

/**
 * Obter estatísticas de metas
 */
exports.getStats = async (req, res) => {
  try {
    const { period: queryPeriod } = req.query;

    // Determinar período de data
    let startDate;
    if (queryPeriod === 'day') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (queryPeriod === 'week') {
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (queryPeriod === 'month') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (queryPeriod === 'year') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // Filtro base
    const baseFilter = { userId: req.userId };
    const dateFilter = startDate ? { ...baseFilter, createdAt: { $gte: startDate } } : baseFilter;

    // Realizar queries em paralelo para performance
    const [totalCount, completedCount, personalCount, careerCount, academiaCount] = await Promise.all([
      Goal.countDocuments(dateFilter),
      Goal.countDocuments({ ...dateFilter, completed: true }),
      Goal.countDocuments({ ...dateFilter, category: 'personal' }),
      Goal.countDocuments({ ...dateFilter, category: 'career' }),
      Goal.countDocuments({ ...dateFilter, category: 'academia' }),
    ]);

    const completionRate = totalCount > 0 ? ((completedCount / totalCount) * 100).toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        period: queryPeriod || 'all',
        total: totalCount,
        completed: completedCount,
        pending: totalCount - completedCount,
        completionRate: parseFloat(completionRate),
        byCategory: {
          personal: personalCount,
          career: careerCount,
          academia: academiaCount,
        },
      },
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: ERRORS.INTERNAL_ERROR });
  }
};
