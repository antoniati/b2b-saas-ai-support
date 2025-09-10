import { userA, userB } from "./users-fixture";

import {
  faqEmbeddingA1,
  faqEmbeddingA2,
  faqEmbeddingB1,
  faqEmbeddingB2,
} from "./faq-embedding-fixtures";

export const faqA1 = {
  id: "faq-a1",
  tenantId: userA.tenantId,
  question: "Como resetar minha senha?",
  answer: "Clique em 'Esqueci minha senha' e siga as instruções.",
  createdAt: new Date(),
  updatedAt: new Date(),
  FaqEmbedding: {
    create: [faqEmbeddingA1, faqEmbeddingA2],
  },
};

export const faqB1 = {
  id: "faq-b1",
  tenantId: userB.tenantId,
  question: "Como resetar minha senha?",
  answer: "Clique em 'Esqueci minha senha' e siga as instruções.",
  createdAt: new Date(),
  updatedAt: new Date(),
  FaqEmbedding: {
    create: [faqEmbeddingB1, faqEmbeddingB2],
  },
};
