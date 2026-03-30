import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Exporta funções para lidar com autenticação de usuários
export async function registerUser({ email, password, name }) {
    const existing = await prisma.user.findUnique({ where: { email } }); // Verifica se o email já está cadastrado
    if (existing) throw new Error('Email já cadastrado.');
    const hash = await bcrypt.hash(password, 10); // Gera um hash da senha para armazenamento seguro
    const user = await prisma.user.create({ data: { email, password: hash, name } }); // Cria o usuário no banco de dados
    return { id: user.id, email: user.email, name: user.name };
}

// Função para login de usuário, retorna um token JWT se as credenciais forem válidas
export async function loginUser({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado.');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Senha inválida.');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
}
