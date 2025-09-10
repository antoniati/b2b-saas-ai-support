import { PrismaClient } from "@prisma/client";
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";

let prismaClient: PrismaClient;

export function getPrisma() {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
    console.log("🚀 PrismaClient criado:", typeof (prismaClient as any).$use);

    // ⚡ Só ativa middleware se estivermos em Node.js
    const isNodeRuntime =
      typeof process !== "undefined" && process?.versions?.node;
    if (isNodeRuntime) {
      (prismaClient as any).$use(async (params: any, next: any) => {
        const context = TenantRequestContext.get();
        if (context?.tenantId) {
          await prismaClient.$executeRaw`
            SELECT set_config('app.tenant_id', ${context.tenantId}, true)
          `;
        }
        return next(params);
      });
    } else {
      console.log("⚠ Prisma middleware ignorado no Edge Runtime");
    }
  }

  return prismaClient;
}
