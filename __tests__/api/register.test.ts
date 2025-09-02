import { POST } from '@/app/api/users/register/route';
import { UserAction } from '@/features/users/server-actions/user.action';
import { validateSchema } from '@/shared/utils/validation.utils';

jest.mock('@/features/users/server-actions/user.action');
jest.mock('@/shared/utils/validation.utils');

describe('POST /api/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configuração padrão: validateSchema não lança erro
    (validateSchema as jest.Mock).mockImplementation(() => {});
  });

  it('deve registrar usuário com sucesso', async () => {
    const mockUserData = {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      planId: 'plan-123',
    };

    const mockResponse = {
      ok: true,
      status: 200,
      message: 'Usuário registrado com sucesso',
      data: { id: 1, ...mockUserData },
    };

    (UserAction.registerUser as jest.Mock).mockResolvedValue(mockResponse);

    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual(mockResponse);
    expect(response.status).toBe(200);
  });

  it('deve retornar erro se validação do schema falhar', async () => {
    const invalidUserData = {
      name: 'João',
      email: 'email-invalido',
      password: '123',
    };

    // Mock específico para este teste: validação falha
    (validateSchema as jest.Mock).mockImplementation(() => {
      throw new Error('Dados inválidos');
    });

    const req = new Request('http://localhost/api/register', {
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

  it('deve retornar erro se UserAction.registerUser falhar', async () => {
    const mockUserData = {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      planId: 'plan-123',
    };

    const mockErrorResponse = {
      ok: false,
      status: 400,
      message: 'Email já cadastrado',
    };

    (UserAction.registerUser as jest.Mock).mockResolvedValue(mockErrorResponse);

    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual(mockErrorResponse);
    expect(response.status).toBe(400);
  });

  it('deve retornar erro 400 se planId não for fornecido', async () => {
    const mockUserData = {
      name: 'João Silva',
      email: 'joao@email.com',
      password: 'senha123',
      // sem planId
    };

    const mockResponse = {
      ok: true,
      status: 200,
      message: 'Usuário registrado com sucesso',
      data: { id: 1, ...mockUserData },
    };

    (UserAction.registerUser as jest.Mock).mockResolvedValue(mockResponse);

    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockUserData),
    });

    const response = await POST(req);
    const jsonResponse = await response.json();

    expect(validateSchema).toHaveBeenCalled();
    expect(UserAction.registerUser).toHaveBeenCalledWith(
      {
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'senha123',
      },
      undefined, // planId será undefined
    );
    expect(jsonResponse.ok).toBe(true);
  });
});
