import { Role, UserStatus } from "@prisma/client";

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
  tenantId: string;
}

/**
 * Valores de um formulário de usuário.
 */
export interface UserFormValues {
  name: string;
  email: string;
  password: string;
  role?: Role;
  status?: UserStatus;
}

export interface CreateUserForm extends UserFormValues {
  tenantId: string;
}

export type UserInviteValues = Omit<UserFormValues, "password"> & {
  password?: string;
};
