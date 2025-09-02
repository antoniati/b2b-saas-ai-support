import { handleAction } from '@/shared';
import { AuthService, UserService, TokenService, EmailService } from '@/features/users';

export const AuthAction = {
  login: (props: { email: string; password: string; callBackUrl?: string; code?: string }) =>
    handleAction(async () => {
      const user = await UserService.getByEmail(props.email);

      await UserService.verifyAccountConfirmed(user?.email ?? '', user?.createdAt as Date);

      if (user?.isTwoFactorEnabled && !props.code) {
        const { token } = await TokenService.generate(user?.email, 'TWO_FACTOR');
        await EmailService.sendTwoFactorCode(user?.email, token);
        return { twoFactor: true };
      }

      if (user?.isTwoFactorEnabled && props.code) {
        await TokenService.validateTwoFactor(user?.email, props.code);
      }

      await AuthService.login(props.email, props.password, props.callBackUrl);

      return { email: props.email };
    }),

  logout: () =>
    handleAction(async () => {
      await AuthService.logout();
      return { loggedOut: true };
    }),

  completeRegistration: (props: { token: string; password: string }) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(props.token, 'EMAIL_VERIFICATION');
      await TokenService.checkExpiration(tokenData.token);
      const user = await UserService.getByEmail(tokenData.email);

      await UserService.updatePassword(user?.id || '', props.password);
      await UserService.updateVerificationDate(user?.id || '');

      await AuthService.login(user?.email || '', props.password, '/');

      return { email: user?.email };
    }),

  passwordRecover: (email: string) =>
    handleAction(async () => {
      const user = await UserService.getByEmail(email);
      const tokenData = await TokenService.generate(user?.email || '', 'RESET_PASSWORD');
      await EmailService.sendResetLink(user?.email || '', tokenData.token);
      return { email: user?.email, token: tokenData.token };
    }),

  passwordReset: (props: { token: string; password: string }) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(props.token, 'RESET_PASSWORD');
      await TokenService.checkExpiration(tokenData.token);

      const user = await UserService.getByEmail(tokenData.email);
      await UserService.updatePassword(user?.id || '', props.password);

      return { email: user?.email, token: tokenData.token };
    }),

  resendTwoFactorCode: (email: string) =>
    handleAction(async () => {
      const tokenData = await TokenService.generate(email, 'TWO_FACTOR');
      await EmailService.sendTwoFactorCode(email, tokenData.token);
      return { email, token: tokenData.token };
    }),

  confirmAccount: (token: string) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(token, 'EMAIL_VERIFICATION');
      await TokenService.checkExpiration(tokenData.token);

      const user = await UserService.getByEmail(tokenData.email);
      await UserService.updateVerificationDate(user?.id || '');

      return { email: user?.email };
    }),
};
