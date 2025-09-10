// 1️⃣ Carrega todos os mocks globais
import "@/__tests__/__mocks__/prisma-mock";
import "@/__tests__/__mocks__/auth-mock";
import "@/__tests__/__mocks__/next-auth-mock";
import "@/__tests__/__mocks__/tenants-mock";
import "@/__tests__/__mocks__/tokens-mock";
import "@/__tests__/__mocks__/users-mock";
import "@/__tests__/__mocks__/password-mock";
import "@/__tests__/__mocks__/emails-mock";

// 2️⃣ Helpers globais
import { createMockRequestAndContext } from "@/__tests__/__setup__/helpers/create-mock-request";
import {
  parseResponse,
  expectApiSuccess,
  expectApiError,
} from "@/__tests__/__setup__/helpers/response-helpers";
import {
  expectSuccess,
  expectFailure,
} from "@/__tests__/__setup__/helpers/assertions";
import { setupSchema } from "@/__tests__/__setup__/helpers/schema";
import { populateDatabase } from "@/__tests__/__setup__/helpers/populate-database";

global.createMockRequestAndContext = createMockRequestAndContext;
global.parseResponse = parseResponse;
global.expectApiSuccess = expectApiSuccess;
global.expectApiError = expectApiError;
global.expectSuccess = expectSuccess;
global.expectFailure = expectFailure;
global.setupSchema = setupSchema;
global.populateDatabase = populateDatabase;

// 3️⃣ Fixtures globais
import { userA, userB } from "@/__tests__/__fixtures__/users-fixture";
import { tenantA, tenantB } from "@/__tests__/__fixtures__/tenants-fixtures";
import { tokenPropsMock } from "@/__tests__/__fixtures__/token-fixture";
import { faqA1, faqB1 } from "@/__tests__/__fixtures__/faq-articles-fixtures";
import {
  faqEmbeddingA1,
  faqEmbeddingA2,
  faqEmbeddingB1,
  faqEmbeddingB2,
} from "@/__tests__/__fixtures__/faq-embedding-fixtures";
import { ticketA1, ticketB1 } from "@/__tests__/__fixtures__/tickets-fixtures";
import {
  ticketResponseA1,
  ticketResponseB1,
} from "@/__tests__/__fixtures__/ticket-response-fixtures";

global.userA = userA;
global.userB = userB;

global.tenantA = tenantA;
global.tenantB = tenantB;

global.tokenPropsMock = tokenPropsMock;

global.faqA1 = faqA1;
global.faqB1 = faqB1;

global.faqEmbeddingA1 = faqEmbeddingA1;
global.faqEmbeddingA2 = faqEmbeddingA2;
global.faqEmbeddingB1 = faqEmbeddingB1;
global.faqEmbeddingB2 = faqEmbeddingB2;

global.ticketA1 = ticketA1;
global.ticketB1 = ticketB1;

global.ticketResponseA1 = ticketResponseA1;
global.ticketResponseB1 = ticketResponseB1;
