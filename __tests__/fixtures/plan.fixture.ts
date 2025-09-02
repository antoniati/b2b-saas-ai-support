import { PlanName } from '@prisma/client';

export const plansPropsMock = [
  { name: PlanName.mensal, id: 'plan-1', features: ['feature-1', 'feature-2'] },
  { name: PlanName.anual, id: 'plan-2', features: ['feature-3', 'feature-4'] },
];
