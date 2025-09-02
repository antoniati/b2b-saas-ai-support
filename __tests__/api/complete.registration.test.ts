import { POST } from '@/app/api/users/complete-registration/route';
import { AuthAction } from '@/features/users';
import { expectApiError, expectApiSuccess, mockRequest } from '@/__tests__/utils/api.utils';

jest.mock('@/features/users/server-actions/auth.actions');

describe('POST /api/users/complete-registration', () => {
  it('deve completar registro com sucesso', async () => {
    (AuthAction.completeRegistration as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      data: { email: 'user@test.com' },
    });

    const req = mockRequest({ token: 'abc123', password: '123456' });
    const res = await POST(req);

    await expectApiSuccess(res, { email: 'user@test.com' });
  });

  it('deve retornar erro se action falhar', async () => {
    (AuthAction.completeRegistration as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      message: 'Token inválido',
    });

    const req = mockRequest({ token: 'invalid', password: '123456' });
    const res = await POST(req);

    await expectApiError(res, 400, 'Token inválido');
  });
});
