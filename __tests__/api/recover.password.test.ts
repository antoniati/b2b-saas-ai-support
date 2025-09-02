import { POST } from '@/app/api/users/recover-password/route';
import { AuthAction } from '@/features/users';
import { validateSchema } from '@/shared';
import { RegisterSchema } from '@/features/users';

jest.mock('@/features/users/server-actions/auth.actions');
jest.mock('@/shared/utils/validation.utils');

describe('POST /api/password-recover', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configuração padrão: validateSchema não lança erro
    (validateSchema as jest.Mock).mockImplementation(() => {});
  });

  it('deve processar recuperação de senha com sucesso', async () => {
    const mockUserData = {
      email: 'joao@email.com',
    };

    const mockResponse = {
      ok: true,
      status: 200,
      message: 'Email de recuperação enviado com sucesso',
    };

    (AuthAction.passwordRecover as jest.Mock).mockResolvedValue(mockResponse);

    const req = new Request('http://localhost/api/password-recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();
    expect(validateSchema).toHaveBeenCalledWith(RegisterSchema, mockUserData);
    expect(AuthAction.passwordRecover).toHaveBeenCalledWith(mockUserData);
    expect(jsonResponse).toEqual(mockResponse);
    expect(jsonResponse.status).toBe(200);
  });

  it('deve retornar erro se validação do schema falhar', async () => {
    const invalidUserData = {
      email: 'email-invalido',
    };

    // Mock específico para este teste: validação falha
    (validateSchema as jest.Mock).mockImplementation(() => {
      throw new Error('Dados inválidos');
    });

    const req = new Request('http://localhost/api/password-recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(jsonResponse.ok).toBe(false);
    expect(jsonResponse.status).toBe(400);
    expect(jsonResponse.message).toBe('Dados inválidos');
  });

  it('deve retornar erro se AuthAction.passwordRecover falhar', async () => {
    const mockUserData = {
      email: 'joao@email.com',
    };

    const mockErrorResponse = {
      ok: false,
      status: 404,
      message: 'Usuário não encontrado',
    };

    (AuthAction.passwordRecover as jest.Mock).mockResolvedValue(mockErrorResponse);

    const req = new Request('http://localhost/api/password-recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockErrorResponse);
    expect(jsonResponse.status).toBe(404);
  });

  it('deve retornar erro se email não for fornecido', async () => {
    const invalidUserData = {
      // email faltando
    };

    const req = new Request('http://localhost/api/password-recover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidUserData),
    });

    // A validação do schema deve capturar isso
    (validateSchema as jest.Mock).mockImplementation(() => {
      throw new Error('Email é obrigatório');
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(jsonResponse.ok).toBe(false);
    expect(jsonResponse.status).toBe(400);
    expect(jsonResponse.message).toBe('Email é obrigatório');
  });
});
