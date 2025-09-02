import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node', // ⚡ modo ESM
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^next-auth$': '<rootDir>/__tests__/__mocks__/next.auth.ts',
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-auth|@auth/core)/)', // ⚡ transforma dependências ESM
    '/node_modules/(?!(?:@auth/prisma-adapter)/)', // 👈 força Jest a transpilar prisma-adapter
  ],
  // evita warning de ts-jest globals deprecado
  globals: {},
  verbose: true,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/__mocks__/default.mocks.ts'],
};

export default config;
