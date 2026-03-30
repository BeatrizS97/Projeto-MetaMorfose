// Middlewares utilitários para API routes Next.js
import jwt from 'jsonwebtoken';

// Middleware de autenticação para API routes Next.js
export function authenticate(handler) {
  return async (req, res) => {
    // Verifica o token JWT no header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido.' });
    }
    // Extrai o token do header e verifica sua validade
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  };
}
