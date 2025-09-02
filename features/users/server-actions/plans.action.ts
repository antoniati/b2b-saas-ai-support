'use server';

import { handleAction } from '@/shared';
import { PlanService } from '@/features/users';

export const PlansAction = {
  async fetchAllPlansAction() {
    return handleAction(async () => {
      const plans = await PlanService.getAll();
      return { allPlans: plans };
    });
  },

  async fetchPlanByIdAction(id: string) {
    return handleAction(async () => {
      const plan = await PlanService.getById(id);
      return { plan };
    });
  },
};
