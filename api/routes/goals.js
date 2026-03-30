import { authenticate } from '../middlewares/authenticate';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalsController';
import { validateGoal } from '../validators/goalValidator';

// API Route para CRUD de Goals com Prisma e autenticação
async function handler(req, res) {
  const userId = req.user.id;
  if (req.method === 'GET') {
    const goals = await getGoals(userId);
    return res.status(200).json(goals);
  }
  if (req.method === 'POST') {
    const { title, description, category, dueDate } = req.body;
    if (!validateGoal({ title })) {
      return res.status(400).json({ error: 'Dados da meta inválidos.' });
    }
    const goal = await createGoal(userId, { title, description, category, dueDate });
    return res.status(201).json(goal);
  }
  if (req.method === 'PUT') {
    const { id, ...data } = req.body;
    const goal = await updateGoal(id, data);
    return res.status(200).json(goal);
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    await deleteGoal(id);
    return res.status(204).end();
  }
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
