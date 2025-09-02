import { Role } from '@prisma/client';

/**
 * Dados de um usuário.
 */
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updateedAt?: Date | null;
  isEmailVerified?: Date | null;
  isTwoFactorEnabled?: boolean;
  planId?: string | null;
}

/**
 * Valores de um formulário de usuário.
 */
export interface UserFormValues {
  planId: string;
  name: string;
  email: string;
  password: string;
}
