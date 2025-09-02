import { UserAction, UserService, TokenService, EmailService } from '@/features/users';

import { expectSuccess } from '@/__tests__/utils/expect.utils';
import { createUserMock } from '@/__tests__/__mocks__/user.mock';

beforeAll(() => {
  createUserMock();
});
afterEach(() => jest.clearAllMocks());

describe('UserAction', () => {
  it('registerUser - deve registrar usuário', async () => {
    const values = { name: 'Test', email: 'user@test.com', password: '123456' };
    const result = await UserAction.registerUser(values, 'plan_123');

    // Verifica que o retorno só contém o email
    expectSuccess(result);
    expect((result.data as { email: string }).email).toEqual('user@test.com');

    // Verifica se o UserService.create foi chamado com o objeto completo
    expect(UserService.create).toHaveBeenCalledWith({
      name: 'Test',
      email: 'user@test.com',
      password: expect.any(String), // Senha gerada dinamicamente
      planId: 'plan_123',
    });

    // Verifica se o TokenService foi chamado com email e tipo correto
    expect(TokenService.generate).toHaveBeenCalledWith('user@test.com', 'EMAIL_VERIFICATION');

    // Verifica se o EmailService foi chamado com email e token
    expect(EmailService.sendVerificationLink).toHaveBeenCalledWith('user@test.com', 'tokenABC');
  });

  it('updatePersonalData - deve atualizar dados pessoais', async () => {
    const values = { name: 'New Name', email: 'new@example.com' };
    const result = await UserAction.updatePersonalData(values, '123456');

    expectSuccess(result);
    expect(result.data).toEqual({ name: 'New Name', email: 'new@example.com' });
  });

  it('updateDataSecurity - deve atualizar segurança', async () => {
    const values = { isTwoFactorEnabled: true };
    const result = await UserAction.updateTwoFactorEnabled(values, '123456');

    expectSuccess(result);
    expect(result.data).toEqual({ isTwoFactorEnabled: true });
  });
});
