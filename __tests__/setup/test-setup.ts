// 1️⃣ Carrega todos os mocks globais
import "@/__tests__/mocks/prisma-mock";
import "@/__tests__/mocks/auth-mock";
import "@/__tests__/mocks/next-auth-mock";
import "@/__tests__/mocks/tenants-mock";
import "@/__tests__/mocks/tokens-mock";
import "@/__tests__/mocks/users-mock";
import "@/__tests__/mocks/password-mock";
import "@/__tests__/mocks/emails-mock";

// 2️⃣ Helpers globais
import { createMockRequestAndContext } from "@/__tests__/setup/helpers/create-mock-request";
import {
  parseResponse,
  expectApiSuccess,
  expectApiError,
} from "@/__tests__/setup/helpers/response-helpers";
import {
  expectSuccess,
  expectFailure,
} from "@/__tests__/setup/helpers/assertions";
import { setupSchema } from "@/__tests__/setup/helpers/schema";
import { populateDatabase } from "@/__tests__/setup/helpers/populate-database";

global.createMockRequestAndContext = createMockRequestAndContext;
global.parseResponse = parseResponse;
global.expectApiSuccess = expectApiSuccess;
global.expectApiError = expectApiError;
global.expectSuccess = expectSuccess;
global.expectFailure = expectFailure;
global.setupSchema = setupSchema;
global.populateDatabase = populateDatabase;

// 3️⃣ Fixtures globais
import { userA, userB } from "@/__tests__/fixtures/users-fixture";
import { tenantA, tenantB } from "@/__tests__/fixtures/tenants-fixtures";
import { tokenPropsMock } from "@/__tests__/fixtures/token-fixture";
import { faqA1, faqB1 } from "@/__tests__/fixtures/faq-articles-fixtures";
import {
  faqEmbeddingA1,
  faqEmbeddingA2,
  faqEmbeddingB1,
  faqEmbeddingB2,
} from "@/__tests__/fixtures/faq-embedding-fixtures";
import { ticketA1, ticketB1 } from "@/__tests__/fixtures/tickets-fixtures";
import {
  ticketResponseA1,
  ticketResponseB1,
} from "@/__tests__/fixtures/ticket-response-fixtures";

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
