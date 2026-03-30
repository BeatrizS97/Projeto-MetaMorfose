

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import { loginUser } from '../../controllers/authController';
import { validateEmail, validatePassword } from '../../validators/userValidator';

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

// API Route para login de usuário com Prisma e validação de dados
export default async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { email, password } = req.body;
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }
  try {
    const result = await loginUser({ email, password });
    return res.status(200).json({ user: result.user, token: result.token });
  } catch (err) {
    const isProd = process.env.NODE_ENV === 'production';
    // 401 para erro de autenticação
    return res.status(401).json({ error: isProd ? 'Credenciais inválidas.' : err.message });
  }
}
