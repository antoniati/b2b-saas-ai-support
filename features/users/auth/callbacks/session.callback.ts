import { Session } from 'next-auth';
import { Role } from '@prisma/client';

import { SessionCallbackType } from '@/features/users/auth/types/callbacks.types';

/**
 * Função de callback personalizada para manipulação da sessão do usuário.
 *
 * Esta função é executada sempre que a sessão de um usuário é acessada ou modificada. Ela mapeia as informações do token JWT
 * para a sessão, garantindo que os dados do usuário, como ID, papel, nome do cliente, telefone e imagem de perfil, sejam
 * sincronizados corretamente na sessão.
 *
 * @async
 * @param {Object} param0 - Objeto contendo o token JWT e a sessão do usuário.
 * @param {JWT} param0.token - O token JWT que contém os dados do usuário.
 * @param {Session} param0.session - A sessão do usuário, onde as informações serão armazenadas.
 * @returns {Promise<Session>} A sessão modificada, contendo os dados atualizados do usuário.
 * @example
 * // O `sessionCallback` garante que as informações do token sejam aplicadas à sessão:
 * const updatedSession = await sessionCallback({ token, session });
 *
 * // A sessão resultante terá o `id`, `role`, `customerName`, `phone` e `image` do usuário.
 */
export const sessionCallback = async ({
  token,
  session,
}: SessionCallbackType): Promise<Session> => {
  if (token.sub && session.user) {
    session.user.id = token.sub; // Associa o ID do usuário ao token JWT
    session.user.role = token.role as Role; // Associa o papel do usuário ao token JWT
    session.user.customerName = token.firstName as string; // Associa o nome do cliente ao token JWT
    session.user.email = token.email as string; // Associa o nome do cliente ao token JWT
    session.user.phone = token.phone as string; // Associa o telefone do cliente ao token JWT
    session.user.image = token.image as string | null; // Associa a imagem de perfil do cliente ao token JWT
    session.user.isTwoFactorEnabled = !!token.isTwoFactorEnabled;
  }

  return session; // Retorna a sessão modificada
};
