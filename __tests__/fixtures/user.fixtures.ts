import { Role } from '@prisma/client';

export const userDataTest = {
  id: 'userId123',
  name: 'User Test',
  email: 'user@test.com',
  role: Role.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
  isTwoFactorEnabled: false,
  isEmailVerified: new Date(),
};
