import { AuthService, EmailService, TokenService, UserService } from '@/features/users';
import { userDataTest } from '@/__tests__/fixtures/user.fixtures';
import { tokenPropsMock } from '@/__tests__/fixtures/token.fixture';

/**
 * Cria simulações para UserService, TokenService, EmailService e AuthService.
 * Útil para testar a AuthAction sem precisar se preocupar com os serviços subjacentes.
 */
export const createAuthMock = () => {
  // UserService
  jest.spyOn(UserService, 'getByEmail').mockResolvedValue({ ...userDataTest });
  jest.spyOn(UserService, 'verifyAccountConfirmed').mockResolvedValue({ token: 'token123' });
  jest.spyOn(UserService, 'updatePassword').mockResolvedValue(userDataTest);
  jest.spyOn(UserService, 'updateVerificationDate').mockResolvedValue(userDataTest);

  // TokenService
  jest.spyOn(TokenService, 'generate').mockResolvedValue({ ...tokenPropsMock });
  jest
    .spyOn(TokenService, 'require')
    .mockResolvedValue({ ...tokenPropsMock, email: userDataTest.email });
  jest.spyOn(TokenService, 'checkExpiration').mockResolvedValue(undefined);
  jest.spyOn(TokenService, 'validateTwoFactor').mockResolvedValue(undefined);

  // EmailService
  jest.spyOn(EmailService, 'sendTwoFactorCode').mockResolvedValue(undefined);
  jest.spyOn(EmailService, 'sendResetLink').mockResolvedValue(undefined);

  // AuthService
  jest.spyOn(AuthService, 'login').mockResolvedValue(undefined);
  jest.spyOn(AuthService, 'logout').mockResolvedValue(undefined);
};
