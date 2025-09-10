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

  $use: jest.fn(),
  $executeRaw: jest.fn(),
  $transaction: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $executeRawUnsafe: jest.fn(),
};

// exporta o objeto mockado
export const prismaMockInstance = prismaMock;

// mocka o import real de prismaClient
jest.mock("@/shared/lib/prisma", () => ({
  __esModule: true,
  default: prismaMock,
}));

export default prismaMock;
