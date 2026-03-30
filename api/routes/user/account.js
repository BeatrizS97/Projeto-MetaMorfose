

import cors from '../../cors';
import { authenticate } from '../../middlewares/authenticate';
import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';

// API route para exclusão de conta de usuário - Requer autenticação e confirmação de senha
async function handler(req, res) {
    cors(req, res, () => { });
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const userId = req.user.id;
    const { password } = req.body;  
    if (!password) return res.status(400).json({ error: 'Senha obrigatória.' });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Senha incorreta.' });
    await prisma.user.delete({ where: { id: userId } });
    return res.status(200).json({ message: 'Conta excluída com sucesso.' });
}

export default authenticate(handler);
