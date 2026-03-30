import prisma from '../prisma';

// Exporta funções para lidar com logs de auditoria
export async function getAuditLogs(userId) {
  return prisma.auditLog.findMany({ where: { userId } }); 
  // Retorna todos os logs de auditoria do usuário, ordenados por data
}
