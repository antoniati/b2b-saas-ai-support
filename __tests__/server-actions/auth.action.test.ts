import { AuthAction } from '@/features/users';
import { createAuthMock } from '@/__tests__/__mocks__/auth.mock';
import { userDataTest } from '@/__tests__/fixtures/user.fixtures';
import { expectSuccess } from '@/__tests__/utils/expect.utils';
import { tokenPropsMock } from '@/__tests__/fixtures/token.fixture';

beforeAll(() => createAuthMock());
afterEach(() => jest.clearAllMocks());

describe('AuthAction (ActionResponse pattern)', () => {
  it('login', async () => {
    const result = await AuthAction.login({ email: userDataTest.email, password: '123456' });
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email });
  });

  it('logout', async () => {
    const result = await AuthAction.logout();
    expectSuccess(result);
    expect(result.data).toEqual({ loggedOut: true });
  });

  it('completeRegistration', async () => {
    const result = await AuthAction.completeRegistration({
      token: tokenPropsMock.token,
      password: '123456',
    });
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email });
  });

  it('passwordRecover', async () => {
    const result = await AuthAction.passwordRecover(userDataTest.email);
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email, token: tokenPropsMock.token });
  });

  it('passwordReset', async () => {
    const result = await AuthAction.passwordReset({
      token: tokenPropsMock.token,
      password: '123456',
    });
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email, token: tokenPropsMock.token });
  });

  it('resendTwoFactorCode', async () => {
    const result = await AuthAction.resendTwoFactorCode(userDataTest.email);
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email, token: tokenPropsMock.token });
  });

  it('confirmAccount', async () => {
    const result = await AuthAction.confirmAccount(tokenPropsMock.token);
    expectSuccess(result);
    expect(result.data).toEqual({ email: userDataTest.email });
  });
});
