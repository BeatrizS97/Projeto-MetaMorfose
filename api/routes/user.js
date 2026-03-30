import { authenticate } from '../middlewares/authenticate';
import { getUserById } from '../controllers/userController';

// API Route para dados do usuário autenticado
async function handler(req, res) {
  const userId = req.user.id;
  if (req.method === 'GET') {
    const user = await getUserById(userId);
    return res.status(200).json(user);
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
