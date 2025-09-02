import { UserRepository } from '@/features/users/repository/user.repo';

/**
 * Evento disparado quando uma conta é vinculada a uma conta externa (por exemplo, Google ou outro provedor de OAuth).
 *
 * Este evento atualiza a data de verificação de e-mail do usuário assim que a conta é vinculada.
 * O evento é chamado automaticamente pelo NextAuth após a vinculação de conta ser bem-sucedida.
 *
 * @async
 * @param {Object} param0 - Objeto contendo o usuário que está realizando a vinculação da conta.
 * @param {Object} param0.user - O usuário que está sendo vinculado.
 * @param {string} param0.user.id - O ID do usuário.
 * @example
 * // O evento `linkAccount` é disparado quando um usuário vincula sua conta:
 * linkAccountEvent({ userId: user.id });
 *
 * // O evento vai atualizar a data de verificação de e-mail do usuário.
 */
export const linkAccountEvent = async ({ user }: { user: any }) => {
  await UserRepository.updateEmailVerificationDate(user.id);
};
