

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import { authenticate } from '../../middlewares/authenticate';
import { updateGoal, deleteGoal } from '../../controllers/goalsController';

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

// API Route para atualizar ou deletar uma meta específica por ID
async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }
  const userId = req.user.id;
  const { id } = req.query;

  // Verifica se o ID da meta foi fornecido
  if (!id) return res.status(400).json({ error: 'ID da meta não informado.' });

  try {
    if (req.method === 'PUT') {
      const goal = await updateGoal(id, req.body);
      return res.status(200).json({ goal });
    }
    if (req.method === 'DELETE') {
      await deleteGoal(id);
      return res.status(204).end();
    }
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    const isProd = process.env.NODE_ENV === 'production';
    return res.status(400).json({ error: isProd ? 'Erro ao processar requisição.' : err.message });
  }
}

export default authenticate(handler);
