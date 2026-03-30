

import cors from '../../cors';
import rateLimit from '../../middlewares/rateLimit';
import { authenticate } from '../../middlewares/authenticate';
import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';
import { validatePassword } from '../../validators/userValidator';

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

// Rota para validar a senha do usuário antes de permitir ações sensíveis (ex: deletar conta)
async function handler(req, res) {
    try {
        await runCors(req, res);
        await runRateLimit(req, res);
    } catch (err) {
        return res.status(500).json({ error: 'Erro de middleware.' });
    }
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const userId = req.user.id;
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

export default authenticate(handler);
