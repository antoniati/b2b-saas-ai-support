jest.mock("@/features/tokens/services/tokens-service", () => ({
  TokenService: {
    generateUuid: jest.fn(),
    generateCode: jest.fn(),
    checkExpiration: jest.fn(),
    generate: jest.fn(),
    require: jest.fn(),
    requireByEmail: jest.fn(),
    delete: jest.fn(),
    validateTwoFactor: jest.fn(),
  },
}));
