
import cors from '../../cors';
import Tokens from 'csrf';

// Instância do gerenciador de tokens CSRF
const tokens = new Tokens();

// API route para gerar um token CSRF seguro e armazenar o secret em cookie httpOnly
export default async function handler(req, res) {
  cors(req, res, () => {});
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // Gera um secret e um token CSRF seguro
  const secret = await tokens.secret();
  const csrfToken = tokens.create(secret);
  // Salva o secret em cookie httpOnly, seguro e restrito ao mesmo site
  res.setHeader('Set-Cookie', `csrfSecret=${secret}; HttpOnly; Path=/; SameSite=Strict; Secure`);
  res.status(200).json({ csrfToken });
}
