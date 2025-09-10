import { Plan, PlanName } from "@prisma/client";

/**
 * Repositorio de plano.
 */
export const PlanRepository = {
  /**
   * Recupera todos os planos da base de dados.
   */
  async findAll(): Promise<Plan[]> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return await prismaClient.plan.findMany({
      select: {
        id: true,
        name: true,
        features: true,
      },
      orderBy: { id: "asc" },
    });
  },

  /**
   * Busca um plano pelo ID.
   */
  async findById(id: string): Promise<Plan | null> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

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
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

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
