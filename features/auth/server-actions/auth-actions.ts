import { handleAction } from "@/shared";
import { UserService } from "@/features/users";
import { TokenService } from "@/features/tokens";
import { EmailService } from "@/features/emails";
import {
  AuthService,
  DEFAULT_LOGIN_REDIRECT,
  type LoginProps,
} from "@/features/auth";
import { TenantRequestContext, TenantService } from "@/features/tenants";

export const AuthAction = {
  /**
   * Realiza o login com base nos parâmetros informados.
   *
   * O login pode ser realizado com ou sem 2FA. Se o usuário possuir 2FA
   * habilitado e o código não for informado, o sistema irá gerar um código
   * e enviar para o email do usuário. Se o código for informado, o sistema
   * irá verificar se o código é válido e, em caso positivo, irá realizar o
   * login.
   *
   * O tenant pode ser informado por meio da propriedade `tenantSlug`. Se
   * o tenant não for informado, o sistema irá tentar extrair o domínio do
   * email e utilizar o domínio para encontrar o tenant.
   *
   * @param props.email - Email do usuário
   * @param props.password - Senha do usuário
   * @param [props.tenantSlug] - Slug do tenant (opcional)
   * @param [props.code] - Código do 2FA (opcional)
   * @param [props.callBackUrl] - URL de redirecionamento após o login (opcional)
   *
   * @returns - Um objeto com a propriedade `email` contendo o email do usuário
   *            ou um objeto com a propriedade `twoFactor` contendo o valor `true`
   *            se o usuário possuir 2FA habilitado e o código não for informado.
   */
  login: (props: LoginProps) =>
    handleAction(async () => {
      let tenantId: string | null = null; // Declara o tenantId como string | null

      // Tentar obter tenantId de várias fontes
      if (props.tenantSlug) {
        // 1. Do header (para APIs)
        const tenant = await TenantService.getBySlug(props.tenantSlug);
        tenantId = tenant?.id || null;
      } else {
        // 2. Do email
        const domain = props.email.split("@")[1];
        const tenant = await TenantService.getByDomain(domain);
        tenantId = tenant?.id || null;
      }

      // Verifica se o usuario existe
      const user = await UserService.getByEmail(props.email);

      // Executa no contexto do tenant
      return TenantRequestContext.run(
        {
          tenantId: tenantId,
          userId: user?.id || "",
        },
        async () => {
          await UserService.verifyAccountConfirmed(
            user?.email as string,
            user?.createdAt as Date,
          );

          if (user?.isTwoFactorEnabled && !props.code) {
            const { token } = await TokenService.generate(
              user?.email,
              "TWO_FACTOR",
            );
            await EmailService.sendTwoFactorCode(user?.email, token);
            return { twoFactor: true };
          }

          if (user?.isTwoFactorEnabled && props.code) {
            await TokenService.validateTwoFactor(user?.email, props.code);
          }

          await AuthService.login(
            props.email,
            props.password,
            props.callBackUrl,
          );
          return { email: props.email };
        },
      );
    }),

  logout: () =>
    handleAction(async () => {
      await AuthService.logout();
      return { loggedOut: true };
    }),

  completeRegistration: (props: { token: string; password: string }) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(
        props.token,
        "EMAIL_VERIFICATION",
      );
      await TokenService.checkExpiration(tokenData.token);
      const user = await UserService.getByEmail(tokenData.email);

      if (user) {
        await UserService.updatePassword(user.id, props.password);
        await UserService.updateVerificationDate(user.id);

        await AuthService.login(
          user.email,
          props.password,
          DEFAULT_LOGIN_REDIRECT,
        );

        return { email: user.email };
      }
    }),

  passwordRecover: (email: string) =>
    handleAction(async () => {
      const user = await UserService.getByEmail(email);
      const tokenData = await TokenService.generate(
        user?.email || "",
        "RESET_PASSWORD",
      );
      await EmailService.sendResetLink(user?.email || "", tokenData.token);
      return { email: user?.email, token: tokenData.token };
    }),

  passwordReset: (props: { token: string; password: string }) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(
        props.token,
        "RESET_PASSWORD",
      );
      await TokenService.checkExpiration(tokenData.token);

      const user = await UserService.getByEmail(tokenData.email);
      await UserService.updatePassword(user?.id || "", props.password);

      return { email: user?.email, token: tokenData.token };
    }),

  resendTwoFactorCode: (email: string) =>
    handleAction(async () => {
      const tokenData = await TokenService.generate(email, "TWO_FACTOR");
      await EmailService.sendTwoFactorCode(email, tokenData.token);
      return { email, token: tokenData.token };
    }),

  confirmAccount: (token: string) =>
    handleAction(async () => {
      const tokenData = await TokenService.require(token, "EMAIL_VERIFICATION");
      await TokenService.checkExpiration(tokenData.token);

      const user = await UserService.getByEmail(tokenData.email);
      await UserService.updateVerificationDate(user?.id || "");

      return { email: user?.email };
    }),
};
