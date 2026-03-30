import prisma from '../prisma';

// Exporta funções para lidar com dados dos usuários
export async function getUserById(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true }
  });
}
