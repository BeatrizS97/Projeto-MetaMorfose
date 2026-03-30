

import cors from '../../cors';
import { authenticate } from '../../middlewares/authenticate';
import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';

// API route para exportar os dados do usuário autenticado, protegida por autenticação
async function handler(req, res) {
    cors(req, res, () => { });
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const userId = req.user.id;
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Senha obrigatória.' });
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { goals: true } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Senha incorreta.' });
    // Não exporta senha!
    const { password: _, ...userData } = user;
    return res.status(200).json({ data: userData });
}

export default authenticate(handler);
