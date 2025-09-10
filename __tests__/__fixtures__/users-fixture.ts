import { Role, UserStatus } from "@prisma/client";

export const userA = {
  id: "user-a",
  name: "User Test A",
  email: "userA@test.com",
  password: "user-123",
  role: "OWNER" as Role,
  status: "ACTIVE" as UserStatus,
  tenantId: "tenant-a",
  isTwoFactorEnabled: false,
  isEmailVerified: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userB = {
  id: "user-b",
  name: "User Test B",
  email: "userB@test.com",
  password: "user-123",
  role: "OWNER" as Role,
  status: "ACTIVE" as UserStatus,
  tenantId: "tenant-b",
  isTwoFactorEnabled: false,
  isEmailVerified: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
