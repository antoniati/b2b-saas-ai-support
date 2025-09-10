import { Role, TokenType } from "@prisma/client";

import { UserService } from "@/features/users";
import { TokenService } from "@/features/tokens";
/**
 * Função de callback personalizada para o processo de autenticação durante o login do usuário.
 *
 * Esta função é executada sempre que o NextAuth tenta autenticar um usuário. Ela verifica se o usuário existe, se o e-mail foi verificado,
 * e se a autenticação de dois fatores (2FA) está habilitada. Se o 2FA estiver habilitado, verifica se a confirmação está presente e a
 * exclui caso seja válida.
 *
 * A função pode retornar `false` para bloquear o login ou `true` para permitir o login.
 *
 * @async
 * @param {Object} param0 - Objeto contendo informações do usuário e da conta.
 * @param {Object} param0.user - O objeto do usuário que está tentando fazer login.
 * @param {string} param0.user.id - O ID do usuário.
 * @param {Object} param0.account - O objeto da conta associada à autenticação.
 * @param {string} param0.account.provider - O provedor de autenticação (por exemplo, "credentials").
 * @returns {Promise<boolean>} Retorna `true` se o login for permitido ou `false` se o login for bloqueado.
 */
export const signInCallback = async ({
  user,
  account,
}: any): Promise<boolean> => {
  if (account?.provider !== "credentials") {
    console.info(`Login permitido via provedor externo: ${account?.provider}`);
    return true;
  }

  const userFound = await UserService.getById(user.id);

  // Bloqueia login se o e-mail não estiver verificado
  if (!userFound?.isEmailVerified) {
    console.warn(
      `Login bloqueado: E-mail não verificado (${userFound?.email})`,
    );
    return false;
  }

  // Restringe acesso ao ADMIN apenas se for o email autorizado
  if (
    userFound.role === Role.ADMIN &&
    userFound.email !== process.env.AUTH_ADMIN_EMAIL
  ) {
    console.warn(
      `Tentativa de login como ADMIN não autorizado: ${userFound?.email}`,
    );
    return false;
  }

  // Autenticação de dois fatores
  if (userFound?.isTwoFactorEnabled) {
    const { id } = await TokenService.requireByEmail(
      userFound?.email,
      TokenType.TWO_FACTOR,
    );

    if (!id) {
      console.warn(
        `Login bloqueado: 2FA habilitado mas não confirmado (${userFound?.email})`,
      );
      return false;
    }

    await TokenService.delete(id, TokenType.TWO_FACTOR);
  }

  return true;
};
