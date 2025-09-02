import { TokenType } from '@prisma/client';

import { prismaClient } from '@/shared';
import { type TokenProps } from '@/features/users';

/**
 * Repositorio de token.
 */
export const TokenRepository = {
  /**
   * Cria um novo token.
   */
  async create({ email, token, expires, type }: TokenProps): Promise<TokenProps> {
    return prismaClient.token.create({
      data: { email, token, expires, type },
    });
  },

  /**
   * Deleta um token pelo ID.
   */
  async delete(id: string): Promise<TokenProps> {
    return prismaClient.token.delete({ where: { id } });
  },

  /**
   * Busca um token pelo e-mail e tipo.
   */
  async findByEmail(email: string, type: TokenType): Promise<TokenProps | null> {
    return prismaClient.token.findFirst({
      where: { email, type },
    });
  },

  /**
   * Busca um token pelo valor e tipo.
   */
  async findByToken(token: string, type: TokenType): Promise<TokenProps | null> {
    return prismaClient.token.findFirst({
      where: { token, type },
    });
  },
};
