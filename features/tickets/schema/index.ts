import { z } from "zod";

import { TicketStatus } from "@prisma/client";

// TicketResponse
export const ticketResponseSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  senderId: z.string().nullable().optional(),
  message: z.string(),
  isAi: z.boolean(),
  createdAt: z.date(),
});

export type TicketResponse = z.infer<typeof ticketResponseSchema>;

// Ticket
export const ticketSchema = z.object({
  id: z.string(),
  subject: z.string().min(3, "O assunto precisa ter ao menos 3 caracteres"),
  content: z.string().min(1, "O conteúdo não pode estar vazio"),
  status: z.enum(TicketStatus),
  tenantId: z.string(),
  creatorId: z.string(),
  assigneeId: z.string().nullable().optional(),
  responses: z.array(ticketResponseSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Ticket = z.infer<typeof ticketSchema>;

// Schema de input para criar ticket
export const ticketCreateSchema = z.object({
  subject: z.string().min(3, "O assunto precisa ter ao menos 3 caracteres"),
  content: z.string().min(1, "O conteúdo não pode estar vazio"),
  assigneeId: z.string().nullable().optional(),
});

export type TicketCreateInput = z.infer<typeof ticketCreateSchema>;
