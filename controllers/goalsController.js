import prisma from '../prisma';

// Exporta funções para lidar com metas dos usuários
export async function getGoals(userId) {
  return prisma.goal.findMany({ where: { userId } });
}

// Função para criar uma nova meta para um usuário específico
export async function createGoal(userId, { title, description, category, dueDate }) {
  return prisma.goal.create({
    data: { title, description, category, dueDate, userId }
  });
}

// Função para atualizar uma meta existente, identificada por ID
export async function updateGoal(id, data) {
  return prisma.goal.update({ where: { id }, data });
}

// Função para deletar uma meta, identificada por ID
export async function deleteGoal(id) {
  return prisma.goal.delete({ where: { id } });
}
