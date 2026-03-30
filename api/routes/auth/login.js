
import cors from '../../cors';
import { loginUser } from '../../controllers/authController';
import { validateEmail, validatePassword } from '../../validators/userValidator';

// API Route para login de usuário com Prisma e validação de dados
export default async function handler(req, res) {
  cors(req, res, () => {});
  // Permite apenas requisições POST para login
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { email, password } = req.body;
  // Valida os dados de entrada usando as funções de validação
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }
  // Tenta realizar o login do usuário usando a função loginUser do controller
  try {
    const result = await loginUser({ email, password });
    return res.status(200).json({ user: result.user, token: result.token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
