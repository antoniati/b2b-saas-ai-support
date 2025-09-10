import { ERROR_MESSAGES, mapPrismaError, validateSchema } from "@/shared";
import {
  TenantSchema,
  TenantRepository,
  type TenantFormValues,
  type TenantResponse,
  TenantRequestContext,
} from "@/features/tenants";

export const TenantService = {
  /**
   * Cria um novo tenant
   */
  async create(values: TenantFormValues): Promise<TenantResponse> {
    // 1. Valida os dados do formulário
    const validatedFiedls = validateSchema(TenantSchema, values);

    // 2. Extrai os dados parseados e validados
    const { name, slug, planId } = validatedFiedls;

    // 3. Verifica se slug já existe
    await TenantService.verifySlugNotExists(slug);

    // 4. Cria um novo tenant
    try {
      const tenantCreated = await TenantRepository.create({
        name,
        slug,
        planId,
      });

      return tenantCreated; // Retorna o tenant criado
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca tenant por ID
   */
  async getById(id: string): Promise<TenantResponse> {
    try {
      const tenant = await TenantRepository.findById(id);
      return {
        id: tenant?.id || "N/A",
        name: tenant?.name || "N/A",
        slug: tenant?.slug || "N/A",
      };
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca tenant por slug
   */
  async getBySlug(slug: string): Promise<TenantResponse | null> {
    try {
      const tenant = await TenantRepository.findBySlug(slug);
      return tenant || null;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca tenant por domínio
   */
  async getByDomain(domain: string): Promise<{ id: string } | null> {
    // 1. Extrai o slug presumindo que o domínio é igual ao slug + domínio base
    const baseDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "b2bsupportai.com";

    // 2. Busca o tenant pelo slug
    if (domain.endsWith(`.${baseDomain}`)) {
      const slug = domain.replace(`.${baseDomain}`, "");
      const tenant = await TenantRepository.findBySlug(slug);
      return tenant || null; // Retorna o tenant encontrado ou null
    }

    // 3. Busca o tenant pelo domínio
    try {
      const tenant = await TenantRepository.findByDomain(domain);
      return tenant || null; // Retorna o tenant encontrado ou null
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza um tenant
   */
  async update(
    id: string,
    values: Partial<TenantFormValues>,
  ): Promise<TenantResponse> {
    // 1. Verifica se slug já existe
    if (values.slug) await TenantService.verifySlugNotExists(values.slug);

    // 2. Valida os dados do formulário
    const validatedFiedls = validateSchema(TenantSchema.partial(), values);

    // 3. Atualiza o tenant
    try {
      const tenantUpdated = await TenantRepository.update(id, validatedFiedls);
      return tenantUpdated; // Retorna o tenant atualizado
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Deleta um tenant
   */
  async delete(id: string): Promise<void> {
    try {
      await TenantRepository.delete(id);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Verifica se tenantId foi passado na request
   */
  async checkTenantInContext(): Promise<TenantResponse> {
    const context = TenantRequestContext.get();
    if (!context.tenantId)
      throw new Error(ERROR_MESSAGES.TENANT_ID_NOT_FOUND_IN_CONTEXT);
    const tenantFound = await TenantService.getById(context.tenantId!);
    return tenantFound;
  },

  /**
   * Verifica se slug já existe
   */
  async verifySlugNotExists(slug: string): Promise<void> {
    try {
      await TenantRepository.findBySlug(slug);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};
