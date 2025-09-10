import { DomainError, PasswordService } from "@/shared";
import { UserService } from "@/features/users";
import { signIn, signOut } from "@/features/auth/auth";
import { TokenService } from "@/features/tokens";

export const AuthService = {
  /**
   * Realiza o login do usuário
   */
  async login(
    email: string,
    password: string,
    callbackUrl?: string,
  ): Promise<{ twoFactor?: boolean } | void> {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      throw new DomainError(result.error.message, 500);
    }
  },

  /**
   * Realiza o logout do usuário.
   */
  async logout(): Promise<void> {
    const result = await signOut({ redirect: false });
    if (result?.error) {
      throw new DomainError(result.error.message, 500);
    }
    return result;
  },

  /**
   * Verifica o e-mail do usuário a partir do token
   */
  async verifyEmail(token: string): Promise<{ ok: boolean }> {
    await TokenService.checkExpiration(token);

    const record = await TokenService.require(token, "EMAIL_VERIFICATION");
    await UserService.updateVerificationDate(record.email);

    if (record && record.id) {
      await TokenService.delete(record.id, "EMAIL_VERIFICATION");
    }

    return { ok: true };
  },

  /**
   * Envia um email com um link para o usuário resetar sua senha.
   * Caso o usuário tenha um token de reset de senha antigo, ele é excluído.
   */
  async requestPasswordReset(email: string): Promise<void> {
    const existingToken = await TokenService.requireByEmail(
      email,
      "RESET_PASSWORD",
    );
    if (existingToken && existingToken.id) {
      await TokenService.delete(existingToken.id, "RESET_PASSWORD");
    }

    await TokenService.generate(email, "RESET_PASSWORD");
  },

  /**
   * Redefine a senha do usuário com base no token.
   * Caso o token seja válido, a senha do usuário é atualizada.
   * Caso o token seja inválido, um erro é retornado.
   */
  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ ok: boolean }> {
    const record = await TokenService.require(token, "RESET_PASSWORD");

    const hashedPassword = await PasswordService.hash(newPassword);

    await UserService.updatePassword(record.email, hashedPassword);

    if (record && record.id) {
      await TokenService.delete(record.id, "RESET_PASSWORD");
    }

    return { ok: true };
  },
};
