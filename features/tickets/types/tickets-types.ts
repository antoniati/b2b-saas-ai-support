import z from "zod";

import {
  TicketCreateSchema,
  TicketResponseSchema,
  TicketSchema,
} from "@/features/tickets/schema";

export type Ticket = z.infer<typeof TicketSchema>;
export type TicketResponse = z.infer<typeof TicketResponseSchema>;
export type TicketCreateInput = z.infer<typeof TicketCreateSchema>;
