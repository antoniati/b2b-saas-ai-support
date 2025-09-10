jest.mock("@/features/tenants/contexts/tenants-context", () => ({
  TenantRequestContext: {
    get: jest.fn(),
    run: jest.fn((context: { tenantId: string; userId: string }, fn) => fn()),
    isAuthenticated: jest.fn(),
  },
}));

jest.mock("@/features/tenants/utils/tenants-domain-utils", () => ({
  getTenantDomain: jest.fn(),
  extractSlugFromDomain: jest.fn(),
}));

jest.mock("@/features/tenants/utils/tenants-guards-utils", () => ({
  getRequestContext: jest.fn(),
  getRequestTenantId: jest.fn(),
  requireAuthenticated: jest.fn(),
  ensureTenantAccess: jest.fn(),
  requireTenantId: jest.fn(),
}));

jest.mock("@/features/tenants/services/tenants-service", () => ({
  TenantService: {
    create: jest.fn(),
    getById: jest.fn(),
    getBySlug: jest.fn(),
    getByDomain: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    checkTenantInContext: jest.fn(),
    verifySlugNotExists: jest.fn(),
  },
}));
