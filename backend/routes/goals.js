// routes/goals.js - Rotas de metas
const express = require('express');
const goalsController = require('../controllers/goalsController');
const validationRules = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas de goals requerem autenticação
router.use(authenticateToken);

/**
 * GET /api/goals
 * Obter metas do usuário com filtros opcionais
 * Query params: category, completed, period
 */
router.get('/', goalsController.getGoals);

/**
 * POST /api/goals
 * Criar nova meta
 */
router.post('/', validationRules.createGoalValidation, goalsController.createGoal);

/**
 * PUT /api/goals/:id
 * Atualizar meta
 */
router.put(
  '/:id',
  validationRules.updateGoalValidation,
  goalsController.updateGoal
);

/**
 * DELETE /api/goals/:id
 * Deletar meta
 */
router.delete('/:id', goalsController.deleteGoal);

/**
 * GET /api/goals/stats
 * Obter estatísticas de metas
 * Query param: period (week, month, year, all)
 */
router.get('/stats', goalsController.getStats);
router.get('/stats/all', goalsController.getStats);

module.exports = router;
