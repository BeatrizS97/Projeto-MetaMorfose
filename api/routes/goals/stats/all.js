

import cors from '../../../cors';
import { authenticate } from '../../../middlewares/authenticate';
import prisma from '../../../prisma/client';

// API route para obter estatísticas gerais das metas do usuário
async function handler(req, res) {
  cors(req, res, () => {});
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const userId = req.user.id;
  const period = req.query.period || 'month';

  const [total, completed, pending] = await Promise.all([
    prisma.goal.count({ where: { userId } }),
    prisma.goal.count({ where: { userId, completed: true } }),
    prisma.goal.count({ where: { userId, completed: false } })
  ]);
  return res.status(200).json({ stats: { total, completed, pending, period } });
}

export default authenticate(handler);
