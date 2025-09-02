import { PlansAction } from '@/features/users';
import { createPlanMock } from '@/__tests__/__mocks__/plan.mock';
import { expectSuccess } from '@/__tests__/utils/expect.utils';
import { plansPropsMock } from '@/__tests__/fixtures/plan.fixture';

beforeAll(() => createPlanMock());
afterEach(() => jest.clearAllMocks());

describe('PlanAction', () => {
  it('fetchAllPlansAction - deve encontrar todos os planos', async () => {
    const result = await PlansAction.fetchAllPlansAction();

    expectSuccess(result);
    expect(result.data).toEqual({ allPlans: plansPropsMock });
  });
});
