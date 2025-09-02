import { Plan, PlanName } from '@prisma/client';

import { prismaClient } from '@/shared';

/**
 * Repositorio de plano.
 */
export const PlanRepository = {
  /**
   * Recupera todos os planos da base de dados.
   */
  async findAll(): Promise<Plan[]> {
    return await prismaClient.plan.findMany({
      select: {
        id: true,
        name: true,
        features: true,
      },
      orderBy: { id: 'asc' },
    });
  },

  /**
   * Busca um plano pelo ID.
   */
  async findById(id: string): Promise<Plan | null> {
    return await prismaClient.plan.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        features: true,
      },
    });
  },

  /**
   * Busca um plano pelo nome.
   */
  async findByName(name: PlanName): Promise<Plan | null> {
    return await prismaClient.plan.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        features: true,
      },
    });
  },
};
