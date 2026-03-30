
import cors from '../../cors';
import { authenticate } from '../../middlewares/authenticate';
import { updateGoal, deleteGoal } from '../../controllers/goalsController';

// API Route para atualizar ou deletar uma meta específica por ID
async function handler(req, res) {
  cors(req, res, () => {});
  const userId = req.user.id;
  const { id } = req.query;

  // Verifica se o ID da meta foi fornecido
  if (!id) return res.status(400).json({ error: 'ID da meta não informado.' });

  // Verifica se a meta pertence ao usuário antes de permitir atualização ou exclusão
  if (req.method === 'PUT') {
    const goal = await updateGoal(id, req.body);
    return res.status(200).json({ goal });
  }
  // Permite apenas atualização (PUT) e exclusão (DELETE) de metas
  if (req.method === 'DELETE') {
    await deleteGoal(id);
    return res.status(204).end();
  }
  // Se o método não for permitido, retorna erro 405
  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
