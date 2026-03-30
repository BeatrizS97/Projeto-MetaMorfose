

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import { registerUser } from '../../controllers/authController';
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

// API Route para registro de usuário com Prisma
export default async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }
  // Permite apenas método POST para registro
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { email, password, name } = req.body;
  // Valida os dados de entrada
  if (!validateEmail(email) || !validatePassword(password)) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }
  // Tenta registrar o usuário e retorna o resultado ou erro
  try {
    const user = await registerUser({ email, password, name });
    return res.status(201).json({ user });
  } catch (err) {
    const isProd = process.env.NODE_ENV === 'production';
    return res.status(400).json({ error: isProd ? 'Não foi possível registrar.' : err.message });
  }
}
