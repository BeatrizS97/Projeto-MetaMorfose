// Prisma Client singleton for Next.js API routes
import { PrismaClient } from '@prisma/client';

let prisma;
// Em produção, reutiliza a instância global para evitar múltiplas conexões
if (process.env.NODE_ENV === 'production') {
  prisma = global.prisma || new PrismaClient();
  global.prisma = prisma;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
