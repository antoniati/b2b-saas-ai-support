const prismaMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  tenant: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  ticket: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  ticketResponse: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  $use: jest.fn(),
  $executeRaw: jest.fn(),
  $transaction: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $executeRawUnsafe: jest.fn(),
};

// Exportar como default para uso direto
export default prismaMock;

// Exportar como instância para uso em testes
export const prismaMockInstance = prismaMock;

// Mock da função getPrisma
jest.mock("@/shared/lib/prisma", () => ({
  __esModule: true,
  getPrisma: () => prismaMock,
}));
