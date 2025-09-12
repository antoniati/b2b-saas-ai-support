export const getPrismaClient = async () => {
  const { getPrisma } = await import("@/shared/lib/prisma");
  return getPrisma();
};
