
import cors from '../../cors';
import { authenticate } from '../../middlewares/authenticate';
import { getGoals, createGoal } from '../../controllers/goalsController';
import { validateGoal } from '../../validators/goalValidator';

// API Route para CRUD de Goals com Prisma e autenticação
async function handler(req, res) {
  cors(req, res, () => {});
  const userId = req.user.id;

  // GET /api/goals - Retorna as metas do usuário autenticado
  if (req.method === 'GET') {
    const goals = await getGoals(userId);
    return res.status(200).json({ goals });
  }
  // POST /api/goals - Cria uma nova meta para o usuário autenticado
  if (req.method === 'POST') {
    const { title, description, category, dueDate } = req.body;
    if (!validateGoal({ title })) {
      return res.status(400).json({ error: 'Dados da meta inválidos.' });
    }
    const goal = await createGoal(userId, { title, description, category, dueDate });
    return res.status(201).json({ goal });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
