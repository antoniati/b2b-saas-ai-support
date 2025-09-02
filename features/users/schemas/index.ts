import { z } from 'zod';

import { ERROR_MESSAGES } from '@/shared';

export const LoginSchema = z.object({
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
  password: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  code: z.string().optional(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
  email: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED_FIELD }),
});

export const CompleteRegistrationSchema = z.object({
  password: z.string().min(6, { message: ERROR_MESSAGES.WEAK_PASSWORD }),
});

export const PasswordRecoverSchema = z.object({
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
});

export const PasswordResetSchema = z.object({
  password: z.string().min(6, { message: ERROR_MESSAGES.WEAK_PASSWORD }),
});

export const DataSecuritySchema = z.object({
  isTwoFactorEnabled: z.boolean().default(false),
});

export const PersonalDataSchema = z.object({
  name: z.string().optional(),
  email: z.email({ message: ERROR_MESSAGES.REQUIRED_FIELD }),
});
