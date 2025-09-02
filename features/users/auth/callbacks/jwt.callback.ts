import { JWT } from 'next-auth/jwt'; // Importa o tipo JWT do NextAuth.
import { UserService } from '../../services/user.service';

/**
 * Função de callback personalizada para manipulação do token JWT durante a autenticação.
 *
 * Esta função é executada sempre que o token JWT do usuário é acessado ou modificado. Ela busca as informações adicionais
 * do usuário no banco de dados (como papel, nome, imagem e telefone) e as adiciona ao token, garantindo que os dados
 * do usuário sejam sincronizados corretamente no momento da autenticação.
 *
 * @async
 * @param {Object} param0 - Objeto contendo o token JWT.
 * @param {JWT} param0.token - O token JWT que contém os dados do usuário.
 * @returns {Promise<JWT>} O token JWT modificado, contendo os dados adicionais do usuário.
 * @example
 * // O `jwtCallback` garante que as informações do usuário sejam sincronizadas no token:
 * const updatedToken = await jwtCallback({ token });
 *
 * // O token resultante terá o `role`, `firstName`, `image` e `phone` do usuário.
 */
export const jwtCallback = async ({ token }: { token: JWT }): Promise<JWT> => {
  // Se o token não possui um sub (ID do usuário), não há necessidade de buscar dados adicionais
  if (!token.sub) return token;

  const existingUser = await UserService.getByEmail(token.sub); // Busca os dados adicionais do usuário no banco de dados

  // Atualiza os dados adicionais do token com os dados do usuário encontrados
  if (existingUser) {
    token.sub = existingUser.id; // Atualiza o ID do usuário
    token.role = existingUser.role; // Atualiza o papel do usuário
    token.firstName = existingUser.name; // Atualiza o nome do cliente do usuário
    token.email = existingUser.email; // Atualiza o nome do cliente do usuário
    token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled; // Atualiza o telefone do usuário
  }

  return token; // Retorna o token modificado com os dados adicionais do usuário
};
