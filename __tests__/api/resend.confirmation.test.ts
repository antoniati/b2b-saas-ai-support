import { POST } from '@/app/api/users/resend-confirmation/route';
import { AuthAction } from '@/features/users';

jest.mock('@/features/users/server-actions/auth.actions');

describe('POST /api/resend-two-factor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve reenviar código two-factor com sucesso', async () => {
    const email = 'joao@email.com';

    const mockResponse = {
      ok: true,
      status: 200,
      message: 'Código two-factor reenviado com sucesso',
    };

    (AuthAction.resendTwoFactorCode as jest.Mock).mockResolvedValue(mockResponse);

    const req = new Request('http://localhost/api/resend-two-factor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(AuthAction.resendTwoFactorCode).toHaveBeenCalledWith(email);
    expect(jsonResponse).toEqual(mockResponse);
    expect(jsonResponse.status).toBe(200);
  });

  it('deve retornar erro se AuthAction.resendTwoFactorCode falhar', async () => {
    const email = 'joao@email.com';

    const mockErrorResponse = {
      ok: false,
      status: 404,
      message: 'Usuário não encontrado',
    };

    (AuthAction.resendTwoFactorCode as jest.Mock).mockResolvedValue(mockErrorResponse);

    const req = new Request('http://localhost/api/resend-two-factor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(AuthAction.resendTwoFactorCode).toHaveBeenCalledWith(email);
    expect(jsonResponse).toEqual(mockErrorResponse);
    expect(jsonResponse.status).toBe(404);
  });

  it('deve retornar erro se email não for fornecido', async () => {
    const req = new Request('http://localhost/api/resend-two-factor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // email faltando
    });

    // AuthAction deve lidar com email undefined
    const mockErrorResponse = {
      ok: false,
      status: 400,
      message: 'Email é obrigatório',
    };

    (AuthAction.resendTwoFactorCode as jest.Mock).mockResolvedValue(mockErrorResponse);

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(AuthAction.resendTwoFactorCode).toHaveBeenCalledWith(undefined);
    expect(jsonResponse).toEqual(mockErrorResponse);
    expect(jsonResponse.status).toBe(400);
  });

  it('deve retornar erro se ocorrer exceção não tratada', async () => {
    const email = 'joao@email.com';

    (AuthAction.resendTwoFactorCode as jest.Mock).mockRejectedValue(
      new Error('Erro inesperado no servidor'),
    );

    const req = new Request('http://localhost/api/resend-two-factor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(AuthAction.resendTwoFactorCode).toHaveBeenCalledWith(email);
    expect(jsonResponse.ok).toBe(false);
    expect(jsonResponse.status).toBe(400);
  });

  it('deve retornar erro se corpo da requisição for inválido', async () => {
    const req = new Request('http://localhost/api/resend-two-factor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json', // JSON inválido
    });

    // handleApiResponse deve capturar o erro de parsing JSON
    const mockErrorResponse = {
      ok: false,
      status: 400,
      message: 'JSON inválido',
    };

    // Mock do AuthAction não será chamado devido ao erro de parsing
    (AuthAction.resendTwoFactorCode as jest.Mock).mockResolvedValue(mockErrorResponse);

    const response = await POST(req);
    const jsonResponse = await response.json();

    // Como há erro no parsing JSON, AuthAction não deve ser chamado
    expect(AuthAction.resendTwoFactorCode).not.toHaveBeenCalled();
    expect(jsonResponse.ok).toBe(false);
    expect(jsonResponse.status).toBe(400);
  });
});
