

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import Tokens from 'csrf';

// Instância do gerenciador de tokens CSRF
const tokens = new Tokens();


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

// API route para gerar um token CSRF seguro e armazenar o secret em cookie httpOnly
export default async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // Gera um secret e um token CSRF seguro
  const secret = await tokens.secret();
  const csrfToken = tokens.create(secret);
  // Salva o secret em cookie httpOnly, seguro e restrito ao mesmo site
  const isProd = process.env.NODE_ENV === 'production';
  const maxAge = 24 * 60 * 60; // 24h em segundos
  res.setHeader('Set-Cookie', `csrfSecret=${secret}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAge};${isProd ? ' Secure;' : ''}`);
  res.status(200).json({ csrfToken });
}
