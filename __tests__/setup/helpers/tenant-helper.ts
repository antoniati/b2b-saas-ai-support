import prismaClient from "@/shared/lib/prisma";

export async function withTenant(tenantId: string, fn: () => Promise<any>) {
  await prismaClient.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(`SET LOCAL app.tenant_id = '${tenantId}'`);
    await fn();
  });
}
