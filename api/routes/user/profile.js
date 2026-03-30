

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import { authenticate } from '../../middlewares/authenticate';
import { getUserById } from '../../controllers/userController';

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

// API Route para dados do usuário autenticado
async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }
  const userId = req.user.id;
  if (req.method === 'GET') {
    const user = await getUserById(userId);
    return res.status(200).json({ user });
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
