import { PlanService } from '@/features/users';
import { plansPropsMock } from '@/__tests__/fixtures/plan.fixture';

export const createPlanMock = () => {
  jest.spyOn(PlanService, 'getAll').mockResolvedValue(plansPropsMock);
};
