import { NextRequest, NextResponse } from 'next/server';
import middleware from '@/middleware';

// Mock das dependências
jest.mock('@/features/users/auth/auth', () => ({
  auth: jest.fn((callback) => callback),
}));

jest.mock('@/features/users/auth/utils/ignore.routes');
jest.mock('@/features/users/auth/utils/private.routes');
jest.mock('@/features/users/auth/utils/auth.routes');

const mockShouldBypassAuth = jest.fn();
const mockHandlePrivateRoute = jest.fn();
const mockHandleAuthRoute = jest.fn();

import { shouldBypassAuth } from '@/features/users/auth/utils/ignore.routes';
import { handlePrivateRoute } from '@/features/users/auth/utils/private.routes';
import { handleAuthRoute } from '@/features/users/auth/utils/auth.routes';

(shouldBypassAuth as jest.Mock) = mockShouldBypassAuth;
(handlePrivateRoute as jest.Mock) = mockHandlePrivateRoute;
(handleAuthRoute as jest.Mock) = mockHandleAuthRoute;

// Mock do NextAuthRequest
interface MockNextAuthRequest extends NextRequest {
  auth: any;
}

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (pathname: string, authData: any = null): MockNextAuthRequest => {
    return {
      nextUrl: new URL(`http://localhost${pathname}`),
      auth: authData,
      clone: () => createMockRequest(pathname, authData),
    } as unknown as MockNextAuthRequest;
  };

  it('deve bypassar rotas que não precisam de autenticação', async () => {
    mockShouldBypassAuth.mockReturnValue(true);

    const req = createMockRequest('/_next/static/test.js');
    const response = await middleware(req, {} as any);

    expect(shouldBypassAuth).toHaveBeenCalledWith('/_next/static/test.js');
    expect(response).toBeUndefined();
  });

  it('deve permitir rotas de API de autenticação', async () => {
    mockShouldBypassAuth.mockReturnValue(false);

    const req = createMockRequest('/api/auth/test');
    const response = await middleware(req, {} as any);

    expect(response).toBeUndefined();
  });

  it('deve redirecionar para login se não autenticado em rota privada', async () => {
    mockShouldBypassAuth.mockReturnValue(false);
    mockHandlePrivateRoute.mockReturnValue(NextResponse.redirect('http://localhost/login'));

    const req = createMockRequest('/dashboard');
    const response = await middleware(req, {} as any);

    expect(handlePrivateRoute).toHaveBeenCalled();
    expect(response).toBeDefined();
  });

  it('deve permitir acesso a rota privada se autenticado', async () => {
    mockShouldBypassAuth.mockReturnValue(false);

    const req = createMockRequest('/dashboard', { user: { id: '123' } });
    const response = await middleware(req, {} as any);

    expect(response).toBeUndefined();
  });

  it('deve lidar com exceções graciosamente', async () => {
    mockShouldBypassAuth.mockImplementation(() => {
      throw new Error('Test error');
    });

    const req = createMockRequest('/test');
    const response = await middleware(req, {} as any);

    expect(response).toBeUndefined();
  });
});
