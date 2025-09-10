import { TokenType } from "@prisma/client";

import { type TokenProps } from "@/features/tokens";

/**
 * Repositorio de token.
 */
export const TokenRepository = {
  /**
   * Cria um novo token.
   */
  async create({
    email,
    token,
    expires,
    type,
  }: TokenProps): Promise<TokenProps> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.token.create({
      data: { email, token, expires, type },
    });
  },

  /**
   * Deleta um token pelo ID.
   */
  async delete(id: string): Promise<TokenProps> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.token.delete({ where: { id } });
  },

  /**
   * Busca um token pelo e-mail e tipo.
   */
  async findByEmail(
    email: string,
    type: TokenType,
  ): Promise<TokenProps | null> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.token.findFirst({
      where: { email, type },
    });
  },

  /**
   * Busca um token pelo valor e tipo.
   */
  async findByToken(
    token: string,
    type: TokenType,
  ): Promise<TokenProps | null> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.token.findFirst({
      where: { token, type },
    });
  },
};
