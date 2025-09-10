jest.mock("@/shared/services/password-service", () => ({
  PasswordService: {
    generateStrongPassword: jest.fn(),
    validatePassword: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
    verify: jest.fn(),
    needsRehash: jest.fn(),
  },
}));
