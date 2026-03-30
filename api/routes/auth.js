import { registerUser, loginUser } from '../controllers/authController';
import { validateEmail, validatePassword } from '../validators/userValidator';

// API Route para autenticação (login/register) com Prisma
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, type } = req.body;
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }
    try {
      if (type === 'register') {
        const user = await registerUser({ email, password, name });
        return res.status(201).json(user);
      } else {
        const result = await loginUser({ email, password });
        return res.status(200).json(result);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
