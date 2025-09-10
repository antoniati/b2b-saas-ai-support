"use server";

import z from "zod";

import { auth } from "@/features/auth/auth";
import { TenantService } from "@/features/tenants";
import { TokenService } from "@/features/tokens";
import { EmailService } from "@/features/emails";
import { ActionResponse, handleAction, PasswordService } from "@/shared";
import {
  UserService,
  PersonalDataSchema,
  DataSecuritySchema,
  UserInviteValues,
} from "@/features/users";

export const UserAction = {
  /**
   * Retorna o usuário autenticado atual na sessão.
   *
   */
  async getCurrentUser() {
    const session = await auth();
    return session?.user ?? undefined;
  },

  /**
   * Envia um convite para o usuário se registrar na plataforma.
   */
  async inviteUser(values: UserInviteValues): Promise<ActionResponse> {
    return handleAction(async () => {
      // 1. Verifica o contexto do tenant
      const tenant = await TenantService.checkTenantInContext();

      // 2. Cria senha temporária
      const tempPassword = PasswordService.generateStrongPassword();

      // 3. Cria o usuário com a senha temporária, vinculando-o ao tenant
      const user = await UserService.create(
        {
          ...values,
          password: tempPassword,
        },
        tenant.id,
      );

      // 3. Gera token de convite
      const token = await TokenService.generate(user.email, "INVITATION");

      // 4. Envia o convite
      await EmailService.sendInvitationLink(
        user.email,
        token.token,
        tempPassword,
        values.role ?? "USER",
        tenant.name,
      );

      // 4. Retorna o e-mail do usuário
      return { email: user.email };
    });
  },

  /**
   * Atualiza os dados pessoais do usuário.
   */
  async updatePersonalData(
    values: z.infer<typeof PersonalDataSchema>,
    userId: string,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      const userUpdated = await UserService.updatePersonalData(
        userId,
        values.email,
        values.name,
      );

      // 4. Retorna o e-mail do usuário
      return { email: userUpdated?.email, name: userUpdated?.name };
    });
  },

  /**
   * Atualiza a flag de autenticação de dois fatores do usuário.
   */
  async updateTwoFactorEnabled(
    values: z.infer<typeof DataSecuritySchema>,
    userId: string,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      // 1. Atualiza a flag de autenticação de dois fatores
      await UserService.updateTwoFactor(userId, values.isTwoFactorEnabled);

      // 2. Retorna a flag de autenticação de dois fatores
      return { isTwoFactorEnabled: values.isTwoFactorEnabled };
    });
  },
};
