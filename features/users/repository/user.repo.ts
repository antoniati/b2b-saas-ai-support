import { Role, User } from '@prisma/client';

import { prismaClient } from '@/shared';
import { UserData, type UserFormValues } from '@/features/users';

/**
 * Dados selecionados do usuário.
 */
const selectedUserData = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  isEmailVerified: true,
  isTwoFactorEnabled: true,
  planId: true,
} as const;

/**
 * Repositorio de usuário.
 */
export const UserRepository = {
  /**
   * Cria um novo usuário.
   */
  async create({
    name,
    email,
    password,
    planId,
  }: UserFormValues): Promise<Pick<UserData, 'email'>> {
    return await prismaClient.user.create({
      data: { name, email, password, planId },
      select: { email: true },
    });
  },

  /**
   * Busca um usuário pelo e-mail.
   */
  async findByEmail(email: string): Promise<UserData | null> {
    return await prismaClient.user.findUnique({
      where: { email },
      select: selectedUserData,
    });
  },

  /**
   * Busca um usuário pelo ID.
   */
  async findById(id: string): Promise<UserData | null> {
    return await prismaClient.user.findUnique({
      where: { id },
      select: selectedUserData,
    });
  },

  /**
   * Busca um usuário pelo e-mail e retorna somente o e-mail e senha para autenticação.
   */
  async findByEmailForCredentials(email: string): Promise<Pick<User, 'email' | 'password'> | null> {
    return await prismaClient.user.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
  },

  /**
   * Atualiza a senha do usuário.
   */
  async updatePassword(email: string, password: string): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { email },
      data: { password },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza o plano do usuário.
   */
  async updateUserPlan(email: string, planId: string): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { email },
      data: { planId },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza a flag de autenticação de dois fatores para o usuário.
   */
  async updateTwoFactor(id: string, isTwoFactorEnabled: boolean): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { id },
      data: { isTwoFactorEnabled },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza o papel do usuário.
   */
  async updateRole(email: string, role: Role): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { email },
      data: { role },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza os dados pessoais do usuário.
   */
  async updatePersonalData({
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { id },
      data: { email, name },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza a data de verificação de e-mail do usuário.
   */
  async updateEmailVerificationDate(email: string): Promise<UserData | null> {
    return await prismaClient.user.update({
      where: { email },
      data: { isEmailVerified: new Date() },
      select: selectedUserData,
    });
  },
};
