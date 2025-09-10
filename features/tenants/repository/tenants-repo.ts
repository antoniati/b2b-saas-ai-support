"use server";

import prismaClient from "@/shared/lib/prisma";

import {
  TenantData,
  type TenantFormValues,
  TenantRequestContext,
  type TenantResponse,
  ensureTenantAccess,
  getRequestTenantId,
  requireAuthenticated,
} from "@/features/tenants";
import { Tenant } from "@prisma/client";
import { ForbiddenError, UnauthorizedError } from "@/shared";

/**
 * Repositorio de tenants (CRUD)
 */
export const TenantRepository = {
  /**
   * Cria um novo tenant.
   */
  async create(
    values: Omit<TenantFormValues, "planId"> & { planId: string },
  ): Promise<TenantResponse> {
    return await prismaClient.tenant.create({
      data: {
        name: values.name,
        slug: values.slug,
        planId: values.planId,
        active: false,
      },
      select: { id: true, name: true, slug: true },
    });
  },

  /**
   * Busca um tenant por ID.
   *
   * Se houver tenant no contexto atual, a operação será bloqueada se o ID
   * especificado for diferente do tenant no contexto.
   */
  async findById(id: string): Promise<Tenant | null> {
    const ctx = TenantRequestContext.get();
    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const tenant = await prismaClient.tenant.findUnique({
      where: { id },
    });

    if (tenant && tenant.id !== ctx.tenantId) {
      throw new ForbiddenError();
    }

    return tenant;
  },

  /**
   * Busca um tenant por slug.
   *
   * A busca por slug não é bloqueada pelo tenant no contexto, mas se o tenant for encontrado
   * e existir tenant no contexto, a operação será bloqueada se o slug especificado for
   * diferente do tenant no contexto.
   */
  async findBySlug(slug: string): Promise<TenantData | null> {
    const tenant = await prismaClient.tenant.findFirst({ where: { slug } });
    if (!tenant) return null;
    ensureTenantAccess(tenant.id);
    return tenant;
  },

  /**
   * Busca um tenant pelo seu domínio.
   *
   * A busca por domínio não  bloqueada pelo tenant no contexto, mas se o tenant for encontrado
   * e existir tenant no contexto, a operação  ser  bloqueada se o domínio especificado for
   * diferente do tenant no contexto.
   */
  async findByDomain(domain: string): Promise<TenantData | null> {
    const tenant = await prismaClient.tenant.findFirst({ where: { domain } });
    if (!tenant) return null;
    ensureTenantAccess(tenant.id);
    return tenant;
  },

  /**
   * Lista todos os tenants.
   *
   * Apenas o super-admin (não relacionado a um tenant) pode usar este método.
   * Se houver tenant no contexto, a operação  será  bloqueada.
   */
  async findAll(): Promise<TenantData[]> {
    const contextoTenantId = getRequestTenantId();
    if (contextoTenantId) return [];
    return prismaClient.tenant.findMany();
  },

  /**
   * Atualiza um tenant.
   *
   * Apenas o proprietário do tenant (ou um administrador global)
   * pode atualizar.
   */
  async update(
    id: string,
    values: Partial<TenantFormValues>,
  ): Promise<TenantResponse> {
    requireAuthenticated();
    ensureTenantAccess(id);
    return prismaClient.tenant.update({
      where: { id },
      data: values,
      select: { id: true, name: true, slug: true },
    });
  },

  /**
   * Desativa um tenant.
   *
   * Apenas o proprietário do tenant (ou um administrador global)
   * pode desativar.
   */
  async delete(id: string): Promise<void> {
    requireAuthenticated();
    ensureTenantAccess(id);
    await prismaClient.tenant.update({
      where: { id },
      data: { active: false },
    });
  },
};
