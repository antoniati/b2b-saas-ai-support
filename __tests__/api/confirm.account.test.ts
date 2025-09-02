import { ERROR_MESSAGES } from '@/shared';
import { AuthAction } from '@/features/users';
import { GET as confirmAccountRoute } from '@/app/api/users/confirm-account/route';

jest.mock('@/features/users/server-actions/auth.actions', () => ({
  AuthAction: {
    confirmAccount: jest.fn(),
  },
}));

describe('GET /api/users/confirm-account', () => {
  afterEach(() => jest.clearAllMocks());

  it('deve retornar erro 400 se token não for informado', async () => {
    const req = new Request('http://localhost/api/users/confirm-account');
    const res = await confirmAccountRoute(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({
      ok: false,
      message: ERROR_MESSAGES.INVALID_TOKEN,
      status: 400,
    });
  });

  it('deve confirmar conta com sucesso', async () => {
    (AuthAction.confirmAccount as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      message: 'Conta confirmada',
      data: { email: 'user@test.com' },
    });

    const req = new Request('http://localhost/api/users/confirm-account?token=abc123');
    const res = await confirmAccountRoute(req);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({
      ok: true,
      status: 200,
      message: 'Conta confirmada',
      data: { email: 'user@test.com' },
    });
    expect(AuthAction.confirmAccount).toHaveBeenCalledWith('abc123');
  });

  it('deve retornar erro se AuthAction.confirmAccount lançar erro', async () => {
    (AuthAction.confirmAccount as jest.Mock).mockRejectedValueOnce(
      new Error(ERROR_MESSAGES.INVALID_TOKEN),
    );

    const req = new Request('http://localhost/api/users/confirm-account?token=invalid');
    const res = await confirmAccountRoute(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({
      ok: false,
      status: 400,
      message: ERROR_MESSAGES.INVALID_TOKEN,
    });
  });
});
