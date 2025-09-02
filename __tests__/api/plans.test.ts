import { GET } from '@/app/api/users/plans/route';
import { PlansAction } from '@/features/users';
import { ERROR_MESSAGES } from '@/shared';

jest.mock('@/features/users', () => ({
  PlansAction: {
    fetchAllPlansAction: jest.fn(),
  },
}));

describe('GET /api/plans', () => {
  it('deve retornar lista de planos com sucesso', async () => {
    // Mock da resposta bem-sucedida
    const mockPlans = [
      { id: 1, name: 'Plano Básico', price: 29.9 },
      { id: 2, name: 'Plano Premium', price: 59.9 },
    ];

    (PlansAction.fetchAllPlansAction as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      message: 'Planos recuperados com sucesso',
      data: mockPlans,
    });

    const req = new Request('http://localhost/api/plans');
    const res = await GET();

    expect(res.status).toBe(200);
    const json = await res.json();

    expect(json).toEqual({
      ok: true,
      status: 200,
      message: 'Planos recuperados com sucesso',
      data: mockPlans,
    });
  });

  it('deve retornar erro se PlansAction falhar', async () => {
    // Mock da resposta de erro
    (PlansAction.fetchAllPlansAction as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      message: ERROR_MESSAGES.NO_PLAN_FOUND,
    });

    const req = new Request('http://localhost/api/plans');
    const res = await GET();

    expect(res.status).toBe(404);
    const json = await res.json();

    expect(json).toEqual({
      ok: false,
      status: 404,
      message: ERROR_MESSAGES.NO_PLAN_FOUND,
    });
  });

  it('deve retornar erro 500 se ocorrer exceção não tratada', async () => {
    // Mock de uma exceção
    (PlansAction.fetchAllPlansAction as jest.Mock).mockRejectedValue(new Error('Erro inesperado'));

    const req = new Request('http://localhost/api/plans');
    const res = await GET();

    expect(res.status).toBe(400); // handleApiResponse usa status 400 para erros
    const json = await res.json();

    expect(json.ok).toBe(false);
    expect(json.status).toBe(400);
    expect(json.message).toBe('Erro inesperado');
  });
});
