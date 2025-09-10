import { v4 as uuidv4 } from "uuid";
import { TokenType } from "@prisma/client";
import { DomainError, ERROR_MESSAGES } from "@/shared";
import { TokenRepository } from "@/features/tokens";

export const TokenService = {
  /**
   * Gera UUID v4
   */
  async generateUuid(): Promise<string> {
    return uuidv4();
  },

  /**
   * Gera código numérico curto
   */
  async generateCode(length = 4): Promise<string> {
    const digits = "0123456789";
    return Array.from(
      { length },
      () => digits[Math.floor(Math.random() * digits.length)],
    ).join("");
  },

  /**
   * Verifica se token expirou
   */
  async checkExpiration(expires: string | Date): Promise<void> {
    if (new Date(expires) < new Date()) {
      throw new DomainError(ERROR_MESSAGES.EXPIRED_TOKEN, 401);
    }
  },

  /**
   * Cria token (UUID ou código curto)
   */
  async generate(email: string, type: TokenType): Promise<{ token: string }> {
    const uuidToken = await TokenService.generateUuid();
    const code = await TokenService.generateCode(4);
    const expires = new Date(Date.now() + 3600_000);

    const selectedToken = type === TokenType.TWO_FACTOR ? code : uuidToken;

    const record = await TokenRepository.create({
      email,
      token: selectedToken,
      type,
      expires,
    });

    if (!record)
      throw new DomainError(ERROR_MESSAGES.TOKEN_GENERATION_FAILED, 500);
    return { token: selectedToken };
  },

  /**
   * Busca token pelo valor e tipo
   */
  async require(token: string, type: TokenType) {
    const record = await TokenRepository.findByToken(token, type);
    if (!record) throw new DomainError(ERROR_MESSAGES.NON_EXISTENT_TOKEN, 404);
    return record;
  },

  /**
   * Busca token pelo e-mail e tipo
   */
  async requireByEmail(email: string, type: TokenType) {
    const record = await TokenRepository.findByEmail(email, type);
    if (!record) throw new DomainError(ERROR_MESSAGES.NON_EXISTENT_TOKEN, 400);
    return record;
  },

  /**
   * Deleta token
   */
  async delete(id: string, type: TokenType): Promise<void> {
    const token = await TokenService.require(id, type);
    const deleted = await TokenRepository.delete(token.id || "");
    if (!deleted)
      throw new DomainError(ERROR_MESSAGES.TOKEN_DELETION_FAILED, 500);
  },

  /**
   * Valida código 2FA
   */
  async validateTwoFactor(email: string, code: string): Promise<void> {
    const record = await TokenService.requireByEmail(
      email,
      TokenType.TWO_FACTOR,
    );
    await TokenService.checkExpiration(record.expires);

    if (record.token !== code) {
      throw new DomainError(ERROR_MESSAGES.NOT_MATCH_2FA_CODE, 401);
    }

    await TokenService.delete(record.id || "", TokenType.TWO_FACTOR);
  },
};
