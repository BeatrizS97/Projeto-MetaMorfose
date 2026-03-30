
import cors from '../cors';
import rateLimit from '../../middlewares/rateLimit';
import { login, register, forgotPassword } from '../../controllers/authController';
import { validateUser } from '../../validators/userValidator';
import Tokens from 'csrf';

const tokens = new Tokens();

function runCors(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}
function runRateLimit(req, res) {
  return new Promise((resolve, reject) => {
    rateLimit(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}

export default async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }

  // CSRF Token
  if (req.method === 'GET' && req.url && req.url.startsWith('/csrf-token')) {
    const secret = await tokens.secret();
    const csrfToken = tokens.create(secret);
    const isProd = process.env.NODE_ENV === 'production';
    const maxAge = 24 * 60 * 60;
    res.setHeader('Set-Cookie', `csrfSecret=${secret}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAge};${isProd ? ' Secure;' : ''}`);
    return res.status(200).json({ csrfToken });
  }

  // Registro
  if (req.method === 'POST' && req.body && req.body.type === 'register') {
    const { email, password, name } = req.body;
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }
    try {
      const user = await registerUser({ email, password, name });
      return res.status(201).json({ user });
    } catch (err) {
      const isProd = process.env.NODE_ENV === 'production';
      return res.status(400).json({ error: isProd ? 'Não foi possível registrar.' : err.message });
    }
  }

  // Login
  if (req.method === 'POST' && req.body && req.body.type === 'login') {
    const { email, password } = req.body;
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }
    try {
      const result = await loginUser({ email, password });
      return res.status(200).json({ user: result.user, token: result.token });
    } catch (err) {
      const isProd = process.env.NODE_ENV === 'production';
      return res.status(401).json({ error: isProd ? 'Credenciais inválidas.' : err.message });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
