import { mapPrismaError } from '@/shared';
import { PlanData, PlanRepository } from '@/features/users';

export const PlanService = {
  /**
   * Recupera todos os planos da base de dados.
   */
  async getAll(): Promise<PlanData[]> {
    try {
      const existingPlans = PlanRepository.findAll();
      return existingPlans;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca um plano pelo ID.
   */
  async getById(id: string): Promise<PlanData | null> {
    try {
      const existingPlan = PlanRepository.findById(id);
      return existingPlan;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca um plano pelo nome.
   */
  async getByName(name: 'mensal' | 'anual'): Promise<PlanData | null> {
    try {
      const existingPlan = PlanRepository.findByName(name);
      return existingPlan;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};
