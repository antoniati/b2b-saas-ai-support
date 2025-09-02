import { TokenType } from '@prisma/client';

/**
 * Dados de um token
 */
export interface TokenProps {
  id?: string;
  email: string;
  token: string;
  type: TokenType;
  expires: Date;
}
