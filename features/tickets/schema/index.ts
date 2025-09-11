import { z } from "zod";

import { TicketStatus } from "@prisma/client";

// TicketResponse
export const TicketResponseSchema = z.object({
  id: z.string(),
  TicketId: z.string(),
  senderId: z.string().nullable().optional(),
  message: z.string(),
  isAi: z.boolean(),
  createdAt: z.date(),
});

// Ticket
export const TicketSchema = z.object({
  id: z.string(),
  subject: z.string().min(3, "O assunto precisa ter ao menos 3 caracteres"),
  content: z.string().min(1, "O conteúdo não pode estar vazio"),
  status: z.enum(TicketStatus),
  tenantId: z.string(),
  creatorId: z.string(),
  assigneeId: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema de input para criar Ticket
export const TicketCreateSchema = z.object({
  subject: z.string().min(3, "O assunto precisa ter ao menos 3 caracteres"),
  content: z.string().min(1, "O conteúdo não pode estar vazio"),
  assigneeId: z.string().nullable().optional(),
});
