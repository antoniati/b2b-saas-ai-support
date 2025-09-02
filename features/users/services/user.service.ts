import { DomainError, ERROR_MESSAGES, mapPrismaError, validateSchema } from '@/shared';
import {
  UserRepository,
  UserData,
  UserFormValues,
  TokenService,
  EmailService,
  PersonalDataSchema,
  RegisterSchema,
  DataSecuritySchema,
  PlanService,
} from '@/features/users';

export const UserService = {
  /**
   * Cria um novo usuário.
   */
  async create(values: UserFormValues): Promise<{ email: string }> {
    validateSchema(RegisterSchema, values);

    const { email, name, planId, password } = values;

    await UserService.verifyEmailNotExists(email);

    await PlanService.getById(planId);

    try {
      const userCreated = await UserRepository.create({ name, email, password, planId });
      return { email: userCreated.email };
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca usuário por ID.
   */
  async getById(userId: string): Promise<UserData | null> {
    try {
      return await UserRepository.findById(userId);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca usuário por e-mail.
   */
  async getByEmail(email: string): Promise<UserData | null> {
    try {
      return await UserRepository.findByEmail(email);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Verifica se o e-mail já existe.
   */
  async verifyEmailNotExists(email: string): Promise<UserData | null> {
    try {
      return await UserRepository.findByEmail(email);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza a senha de um usuário.
   */
  async updatePassword(email: string, password: string): Promise<UserData | null> {
    try {
      return await UserRepository.updatePassword(email, password);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /*
   * Atualiza nome e e-mail do usuário.
   */
  async updatePersonalData(id: string, email: string, name: string): Promise<UserData | null> {
    validateSchema(PersonalDataSchema, { values: { email, name } });

    const userFound = await UserService.getById(id);

    const verifyChanges = userFound?.email === email && userFound?.name === name;
    if (verifyChanges) throw new DomainError(ERROR_MESSAGES.NO_CHANGES_DETECTED, 400);

    try {
      return await UserRepository.updatePersonalData({ id, email, name });
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Habilita ou desabilita a autenticação de dois fatores.
   */
  async updateTwoFactor(id: string, isEnabled: boolean): Promise<UserData | null> {
    try {
      validateSchema(DataSecuritySchema, isEnabled);
      await UserService.getByEmail(id);
      return await UserRepository.updateTwoFactor(id, isEnabled);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza a data de verificação de e-mail.
   */
  async updateVerificationDate(userId: string): Promise<UserData | null> {
    try {
      return await UserRepository.updateEmailVerificationDate(userId);
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Verifica se a conta foi confirmada. Se não, envia um novo link de verificação.
   */
  async verifyAccountConfirmed(email: string, createdAt: Date): Promise<{ token?: string }> {
    const elapsed = Date.now() - new Date(createdAt).getTime();
    const ONE_HOUR = 60 * 60 * 1000;

    if (elapsed >= ONE_HOUR) {
      const token = await TokenService.generate(email, 'EMAIL_VERIFICATION');
      await EmailService.sendVerificationLink(email, token.token);
      return { token: token.token };
    }

    throw new DomainError(ERROR_MESSAGES.EMAIL_NOT_VERIFIED, 400);
  },
};
