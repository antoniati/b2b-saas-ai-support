import { PrismaClient } from '@prisma/client';
/**
 * Declaração global para a variável `prisma`, que pode ser usada em qualquer lugar no código
 * para acessar a instância do cliente Prisma.
 * A variável é definida globalmente para garantir que a mesma instância do cliente Prisma
 * seja reutilizada durante o ciclo de vida da aplicação.
 *
 * @global
 * @type {PrismaClient | undefined}
 */
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Criação ou reutilização de uma instância do PrismaClient.
 *
 * A variável `prismaClient` é usada para garantir que a aplicação utilize uma única instância
 * do PrismaClient durante o desenvolvimento e produção. No ambiente de produção, a instância do
 * PrismaClient é criada apenas uma vez, e em ambientes não-produção, ela é armazenada globalmente
 * para evitar múltiplas instâncias sendo criadas em cada requisição.
 *
 * @type {PrismaClient}
 */
export const prismaClient = globalThis.prisma || new PrismaClient();

/**
 * No ambiente de desenvolvimento (não produção), a instância do PrismaClient é armazenada globalmente
 * para permitir o reuso entre as requisições e evitar a criação de múltiplas instâncias.
 *
 * @note Essa abordagem não deve ser utilizada em produção, pois pode gerar problemas de vazamento de memória.
 *
 * @see PrismaClient
 */
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismaClient;
