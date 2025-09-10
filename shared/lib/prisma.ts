// Importa a classe PrismaClient do Prisma para lidar com o banco de dados
import { PrismaClient } from "@prisma/client";

// Importa a classe TenantRequestContext para lidar com o contexto do tenant
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context";

// Declara uma variável global chamada "prisma" para o PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria uma instância do PrismaClient ou retorna a instância global
const prismaClient = globalThis.prisma || new PrismaClient();

// Verifica se estamos em ambiente de desenvolvimento
if (process.env.NODE_ENV !== "test") {
  // Configura o Prisma para usar o contexto do tenant
  (prismaClient as any).$use(async (params: any, next: any) => {
    const context = TenantRequestContext.get(); // Obtem o contexto do tenant

    // Se o contexto do tenant existir, define a variável de configuração "app.tenant_id"
    if (context?.tenantId) {
      await prismaClient.$executeRaw`
        SELECT set_config('app.tenant_id', ${context.tenantId}, true)
      `;
    }

    // Chama a função "next" para executar o prisma query
    return next(params);
  });
}

// Se estamos em ambiente de desenvolvimento, define a variável global "prisma"
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

// Exporta a instância do PrismaClient
export default prismaClient;
