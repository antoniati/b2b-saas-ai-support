"use server";

import { ActionResponse, handleAction, PasswordService } from "@/shared";
import { TenantFormValues, TenantService } from "@/features/tenants";
import { UserService } from "@/features/users";
import { TokenService } from "@/features/tokens";
import { EmailService } from "@/features/emails";

export const TenantAction = {
  /**
   * Cria um novo tenant
   */
  async create(
    values: TenantFormValues,
    email: string,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      const tenantCreated = await TenantService.create(values);
      const passwordTemp = PasswordService.generateStrongPassword();

      const user = await UserService.create(
        {
          email,
          name: values.name,
          password: passwordTemp,
          role: "OWNER",
          status: "PENDING",
        },
        tenantCreated.id,
      );

      const token = await TokenService.generate(
        user.email,
        "EMAIL_VERIFICATION",
      );
      await EmailService.sendVerificationLink(
        email,
        token.token,
        tenantCreated.name,
      );

      return { email };
    });
  },

  /**
   * Busca tenant por ID
   */
  async getById(id: string): Promise<ActionResponse> {
    return handleAction(async () => {
      const tenant = await TenantService.getById(id);
      return tenant;
    });
  },

  /**
   * Busca tenant por slug
   */
  async getBySlug(slug: string): Promise<ActionResponse> {
    return handleAction(async () => {
      const tenant = await TenantService.getBySlug(slug);
      return tenant;
    });
  },

  /**
   * Atualiza um tenant
   */
  async update(
    id: string,
    values: Partial<TenantFormValues>,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      const tenantUpdated = await TenantService.update(id, values);
      return tenantUpdated;
    });
  },

  /**
   * Deleta um tenant
   */
  async delete(id: string): Promise<ActionResponse> {
    return handleAction(async () => {
      await TenantService.delete(id);
    });
  },
};
