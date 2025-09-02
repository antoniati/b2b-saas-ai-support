'use server';

import z from 'zod';

import { ActionResponse, handleAction } from '@/shared';
import { auth } from '@/features/users/auth/auth';
import {
  UserService,
  TokenService,
  EmailService,
  PasswordService,
  RegisterSchema,
  PersonalDataSchema,
  DataSecuritySchema,
} from '@/features/users';

export const UserAction = {
  async getCurrentUser() {
    const session = await auth();
    return session?.user ?? undefined;
  },

  /**
   * Registra um novo usuário e envia um e-mail de verificação.
   *
   */
  async registerUser(
    values: z.infer<typeof RegisterSchema>,
    planId: string,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      const { email, name } = values;

      const password = PasswordService.generateStrongPassword();

      const userCreated = await UserService.create({ name, email, password, planId });

      const token = await TokenService.generate(userCreated.email, 'EMAIL_VERIFICATION');

      await EmailService.sendVerificationLink(userCreated.email, token.token);

      return { email: userCreated.email };
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
      const { email, name } = values;

      const userUpdated = await UserService.updatePersonalData(userId, email, name ?? '');

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
      const { isTwoFactorEnabled } = values;

      await UserService.updateTwoFactor(userId, isTwoFactorEnabled);

      return { isTwoFactorEnabled };
    });
  },
};
