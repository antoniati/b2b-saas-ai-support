import { NextRequest } from "next/server";
import { ActionResponse } from "@/shared";
import { Role, TicketStatus, UserStatus } from "@prisma/client";

//
// 🔹 Fixtures types
//
type TokenPropsMock = {
  token: string;
  email: string;
  expiresAt: Date;
};

type UserFixture = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  tenantId: string;
  isTwoFactorEnabled: boolean;
  isEmailVerified: Date;
  createdAt: Date;
  updatedAt: Date;
};

type TenantFixture = {
  id: string;
  name: string;
  domain: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  active: boolean;
  planId: string;
};

type FaqEmbeddingFixture = {
  id: string;
  faqId: string;
  vector: number[];
  createdAt: Date;
};

type FaqArticleFixture = {
  id: string;
  tenantId: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
  FaqEmbedding: { create: FaqEmbeddingFixture[] };
};

type TicketResponseFixture = {
  id: string;
  message: string;
  senderId: string;
  isAi: boolean;
  createdAt: Date;
};

type TicketFixture = {
  id: string;
  subject: string;
  content: string;
  status: TicketStatus;
  tenantId: string;
  creatorId: string;
  assigneeId: string;
  createdAt: Date;
  updatedAt: Date;
  responses: { create: TicketResponseFixture[] };
};

declare global {
  //
  // 🔹 Helpers globais
  //
  var createMockRequestAndContext: (
    options?: any,
  ) => [NextRequest, AppRouteHandlerFnContext];
  var parseResponse: (res: Response) => Promise<any>;
  var expectApiSuccess: (res: Response, expectedData?: any) => Promise<void>;
  var setupSchema: (prisma: PrismaClient) => Promise<void>;
  var populateDatabase: () => Promise<void>;
  var expectApiError: (
    res: Response,
    status: number,
    message?: string,
  ) => Promise<void>;

  //
  // 🔹 Assert helpers
  //
  var expectSuccess: <T>(
    res: ActionResponse<T>,
  ) => asserts res is { ok: true; status: number; message: string; data: T };

  var expectFailure: (res: ActionResponse) => asserts res is {
    ok: false;
    status: number;
    message: string;
    errors?: Record<string, string>;
  };

  //
  // 🔹 Fixtures globais
  //
  var userA: UserFixture;
  var userB: UserFixture;

  var tenantA: TenantFixture;
  var tenantB: TenantFixture;

  var tokenPropsMock: TokenPropsMock;

  var faqA1: FaqArticleFixture;
  var faqB1: FaqArticleFixture;

  var faqEmbeddingA1: FaqEmbeddingFixture;
  var faqEmbeddingA2: FaqEmbeddingFixture;
  var faqEmbeddingB1: FaqEmbeddingFixture;
  var faqEmbeddingB2: FaqEmbeddingFixture;

  var ticketA1: TicketFixture;
  var ticketB1: TicketFixture;

  var ticketResponseA1: TicketResponseFixture;
  var ticketResponseB1: TicketResponseFixture;
}

export {};
