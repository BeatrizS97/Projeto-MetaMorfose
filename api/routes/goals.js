
import cors from '../cors';
import rateLimit from '../middlewares/rateLimit';
import { authenticate } from '../middlewares/authenticate';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalsController';
import { validateGoal } from '../validators/goalValidator';
import prisma from '../prisma/client';

// Helper para garantir execução síncrona do CORS
function runCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}

// Wrapper para rate limit (pode ser ajustado por rota)
function runRateLimit(req, res) {
  return new Promise((resolve, reject) => {
    rateLimit(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}

// API Route consolidada para CRUD de Goals, stats e rotas dinâmicas
async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }

  const userId = req.user.id;
  const { id } = req.query;

  // Rota de estatísticas: /api/goals/stats/all
  if (req.method === 'GET' && req.url && req.url.startsWith('/stats/all')) {
    const period = req.query.period || 'month';
    const [total, completed, pending] = await Promise.all([
      prisma.goal.count({ where: { userId } }),
      prisma.goal.count({ where: { userId, completed: true } }),
      prisma.goal.count({ where: { userId, completed: false } })
    ]);
    return res.status(200).json({ stats: { total, completed, pending, period } });
  }

  // CRUD de metas específicas por ID: /api/goals?id=...
  if ((req.method === 'PUT' || req.method === 'DELETE') && id) {
    // PUT: Atualiza meta
    if (req.method === 'PUT') {
      try {
        const goal = await updateGoal(id, req.body);
        return res.status(200).json({ goal });
      } catch (err) {
        const isProd = process.env.NODE_ENV === 'production';
        return res.status(400).json({ error: isProd ? 'Erro ao processar requisição.' : err.message });
      }
    }
    // DELETE: Remove meta
    if (req.method === 'DELETE') {
      try {
        await deleteGoal(id);
        return res.status(204).end();
      } catch (err) {
        const isProd = process.env.NODE_ENV === 'production';
        return res.status(400).json({ error: isProd ? 'Erro ao processar requisição.' : err.message });
      }
    }
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // CRUD geral de metas: /api/goals
  if (req.method === 'GET') {
    const goals = await getGoals(userId);
    return res.status(200).json({ goals });
  }
  if (req.method === 'POST') {
    const { title, description, category, dueDate } = req.body;
    if (!validateGoal({ title })) {
      return res.status(400).json({ error: 'Dados da meta inválidos.' });
    }
    const goal = await createGoal(userId, { title, description, category, dueDate });
    return res.status(201).json({ goal });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
