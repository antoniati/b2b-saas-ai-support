import { getPrisma } from "@/shared/lib/prisma";

const prismaClient = getPrisma();

export async function withTenant(tenantId: string, fn: () => Promise<any>) {
  await prismaClient.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(`SET LOCAL app.tenant_id = '${tenantId}'`);
    await fn();
  });
}
