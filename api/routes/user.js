import { authenticate } from '../middlewares/authenticate';
import { getUserById } from '../controllers/userController';


import cors from '../cors';
import rateLimit from '../middlewares/rateLimit';
import { authenticate } from '../middlewares/authenticate';
import { getUserById } from '../controllers/userController';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import { validatePassword } from '../validators/userValidator';

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

async function handler(req, res) {
  try {
    await runCors(req, res);
    await runRateLimit(req, res);
  } catch (err) {
    return res.status(500).json({ error: 'Erro de middleware.' });
  }

  const userId = req.user.id;

  // GET /api/user/profile
  if (req.method === 'GET' && req.url && req.url.startsWith('/profile')) {
    const user = await getUserById(userId);
    return res.status(200).json({ user });
  }

  // PUT /api/user/password
  if (req.method === 'PUT' && req.url && req.url.startsWith('/password')) {
    const { currentPassword, newPassword } = req.body;
    if (!validatePassword(newPassword)) {
      return res.status(400).json({ error: 'Nova senha inválida. Mínimo 6 caracteres.' });
    }
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return res.status(400).json({ error: 'Senha atual incorreta.' });
      if (await bcrypt.compare(newPassword, user.password)) {
        return res.status(400).json({ error: 'A nova senha não pode ser igual à atual.' });
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id: userId }, data: { password: hash } });
      return res.status(200).json({ message: 'Senha alterada com sucesso.' });
    } catch (err) {
      const isProd = process.env.NODE_ENV === 'production';
      return res.status(400).json({ error: isProd ? 'Erro ao alterar senha.' : err.message });
    }
  }

  // POST /api/user/export
  if (req.method === 'POST' && req.url && req.url.startsWith('/export')) {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Senha obrigatória.' });
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { goals: true } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Senha incorreta.' });
    const { password: _, ...userData } = user;
    return res.status(200).json({ data: userData });
  }

  // DELETE /api/user/account
  if (req.method === 'DELETE' && req.url && req.url.startsWith('/account')) {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Senha obrigatória.' });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Senha incorreta.' });
    await prisma.user.delete({ where: { id: userId } });
    return res.status(200).json({ message: 'Conta excluída com sucesso.' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

export default authenticate(handler);
