import waitPort from "wait-port"; // Importa a biblioteca "wait-port" para aguardar o banco de dados iniciar
import { execSync } from "child_process"; // Importa a biblioteca "child_process" para executar comandos no terminal
import { getPrisma } from "@/shared/lib/prisma";

// Importa a instância do Prisma Client
import { TenantRequestContext } from "@/features/tenants/contexts/tenants-context"; // Importa o contexto de solicitação de tenant

const prismaClient = getPrisma();

/**
 * Prepara o banco de dados para testes.
 *
 * Verifica se o banco de dados PostgreSQL está disponível e, caso esteja,
 * roda `prisma generate` e `prisma migrate deploy` para sincronizar o schema
 * do banco com o schema definido em prisma/schema.prisma.
 *
 * Além disso, configura o middleware RLS para testes, que inclui o tenantId
 * como condição de where para todas as queries de findMany e findFirst.
 *
 * @throws {Error} Se o banco de dados não estiver disponível.
 * @returns {Promise<void>}
 */
export async function setupDatabase() {
  // Aguarda o banco de dados PostgreSQL estar disponível
  const open = await waitPort({
    host: "localhost",
    port: 5432,
    timeout: 60000,
  });

  if (!open)
    throw new Error("Banco de dados não iniciou a tempo (localhost:5432)");

  // Roda prisma generate para gerar o schema
  try {
    execSync("pnpm exec prisma generate --schema=prisma/schema.prisma", {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Erro em prisma generate:", err);
    throw err;
  }

  // Rodar migrations para sincronizar o schema
  try {
    execSync("pnpm exec prisma migrate deploy --schema=prisma/schema.prisma", {
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Erro ao rodar migrations:", err);
    throw err;
  }

  // Conectar ao banco
  await prismaClient.$connect();

  // Middleware RLS para testes
  (prismaClient as any).$use(async (params: any, next: any) => {
    // Obtem o tenantId do contexto
    const tenantId = TenantRequestContext.get?.()?.tenantId ?? null;

    // Inclui o tenantId como condição de where para todas as queries de findMany e findFirst
    if (
      tenantId &&
      params.model &&
      (params.action === "findMany" || params.action === "findFirst")
    ) {
      params.args = {
        ...params.args,
        where: { ...params.args.where, tenantId },
      };
    }

    return next(params); // Chama a função "next" para executar o prisma query
  });
}

/**
 * Reseta o banco de dados para o estado inicial.
 *
 * Executa um `TRUNCATE` em todas as tabelas do banco de dados.
 *
 * @remarks
 * Essa função é usada pelo setup de testes para limpar o banco de dados entre cada teste.
 */
export async function resetDatabase() {
  const tables = [
    "FaqEmbedding",
    "FaqArticle",
    "TicketResponse",
    "Ticket",
    "Tenant",
    "User",
    "Plan",
  ];

  // Limpa as tabelas
  for (const table of tables) {
    try {
      await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
    } catch (err: any) {
      // não panica — tabela pode não existir
      console.warn(
        `Tabela ${table} não existe/erro ao truncar: ${err?.message ?? err}`,
      );
    }
  }
}

/**
 * Fecha a conexão com o banco de dados.
 *
 * Chama o método `$disconnect` do prismaClient para fechar a conexão com o
 * banco de dados. Isso libera recursos e evita que o banco de dados fique
 * preso em testes.
 */
export async function teardownDatabase() {
  await prismaClient.$disconnect();
}
