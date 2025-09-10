"use server";

import type { Role, User } from "@prisma/client";

import {
  selectedUserData,
  type CreateUserForm,
  type UserData,
} from "@/features/users";
import {
  requireAuthenticated,
  ensureTenantAccess,
  getRequestTenantId,
  TenantRequestContext,
} from "@/features/tenants";
import { ForbiddenError, UnauthorizedError } from "@/shared";

/**
 * Repositório de usuário.
 */
export const UserRepository = {
  /**
   * Cria um novo usuário.
   *
   * Apenas permitido dentro do tenant atual.
   */
  async create({
    name,
    email,
    password,
    role,
    status,
    tenantId,
  }: CreateUserForm): Promise<Pick<UserData, "email" | "id" | "tenantId">> {
    ensureTenantAccess(tenantId);

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.user.create({
      data: { name, email, password, tenantId, role, status },
      select: { id: true, email: true, tenantId: true },
    });
  },
  async findByEmail(email: string): Promise<User | null> {
    const ctx = TenantRequestContext.get();
    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (user && user.tenantId !== ctx.tenantId) {
      throw new ForbiddenError();
    }

    return user;
  },

  async findById(id: string): Promise<UserData | null> {
    const ctx = TenantRequestContext.get();
    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (user && user.tenantId !== ctx.tenantId) {
      throw new ForbiddenError();
    }

    return user;
  },
  /**
   * Busca um usuário pelo e-mail e retorna somente credenciais (auth).
   */
  async findByEmailForCredentials(
    email: string,
  ): Promise<Pick<User, "email" | "password"> | null> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.findUnique({
      where: { email },
      select: { email: true, password: true, tenantId: true },
    });

    if (!user) return null;
    ensureTenantAccess(user.tenantId);
    return { email: user.email, password: user.password };
  },

  /**
   * Busca um usuário pelo e-mail e ID do tenant.
   *
   * Apenas permite a busca se o tenant for o mesmo do contexto atual.
   */
  async findByEmailAndTenantId(
    email: string,
    tenantId: string,
  ): Promise<UserData | null> {
    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.findUnique({
      where: { email, tenantId },
      select: selectedUserData,
    });

    if (!user) return null;
    ensureTenantAccess(user.tenantId);
    return user;
  },

  /**
   * Lista todos os usuários de um tenant.
   *
   * Apenas permitido dentro do tenant atual.
   */
  async findAll(): Promise<UserData[]> {
    const tenantId = getRequestTenantId();
    if (!tenantId) return [];

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    return prismaClient.user.findMany({
      where: { tenantId },
      select: selectedUserData,
    });
  },

  /**
   * Atualiza a senha do usuário.
   */
  async updatePassword(
    email: string,
    password: string,
  ): Promise<UserData | null> {
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { email },
      data: { password },
      select: selectedUserData,
    });

    ensureTenantAccess(user.tenantId);
    return user;
  },

  /**
   * Atualiza a flag de autenticação de dois fatores.
   */
  async updateTwoFactor(
    id: string,
    isTwoFactorEnabled: boolean,
  ): Promise<UserData | null> {
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { id },
      data: { isTwoFactorEnabled },
      select: selectedUserData,
    });

    ensureTenantAccess(user.tenantId);
    return user;
  },

  /**
   * Atualiza o papel do usuário.
   */
  async updateRole(email: string, role: Role): Promise<UserData | null> {
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { email },
      data: { role },
      select: selectedUserData,
    });

    ensureTenantAccess(user.tenantId);
    return user;
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
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { id },
      data: { email, name },
      select: selectedUserData,
    });

    ensureTenantAccess(user.tenantId);
    return user;
  },

  /**
   * Atualiza a data de verificação de e-mail.
   */
  async updateEmailVerificationDate(email: string): Promise<UserData | null> {
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { email },
      data: { isEmailVerified: new Date() },
      select: selectedUserData,
    });

    ensureTenantAccess(user.tenantId);
    return user;
  },

  /**
   * Desativa um usuário.
   */
  async delete(id: string): Promise<void> {
    requireAuthenticated();

    const { getPrisma } = await import("@/shared/lib/prisma");
    const prismaClient = getPrisma();

    const user = await prismaClient.user.update({
      where: { id },
      data: { status: "INACTIVE" },
      select: { tenantId: true },
    });

    ensureTenantAccess(user.tenantId);
  },
};
