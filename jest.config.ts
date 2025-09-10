import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node", // ⚡ modo ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleNameMapper: {
    "^@/shared/lib/prisma$": "<rootDir>/__tests__/mocks/prisma-mock.ts",
    "^next-auth$": "<rootDir>/__tests__/mocks/next-auth-mock.ts",
    "^@/(.*)$": "<rootDir>/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(next-auth|@auth/core)/)", // ⚡ transforma dependências ESM
    "/node_modules/(?!(?:@auth/prisma-adapter)/)", // 👈 força Jest a transpilar prisma-adapter
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__/setup/",
    "__tests__/mocks/",
    "__tests__/fixtures/",
  ],
  // evita warning de ts-jest globals deprecado
  globals: {},
  verbose: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup/test-setup.ts"],
};

export default config;
