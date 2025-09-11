import { TicketStatus } from "@prisma/client";

export interface TicketResponseData {
  id: string;
  ticketId: string;
  senderId?: string | null;
  message: string;
  isAi: boolean;
  createdAt: Date;
}

export interface TicketData {
  id: string;
  subject: string;
  content: string;
  status: TicketStatus;
  tenantId: string;
  creatorId: string;
  assigneeId?: string | null;
  responses: TicketResponseData[];
  createdAt: Date;
  updatedAt: Date;
}

// Para criar um ticket
export interface TicketCreateInput {
  subject: string;
  content: string;
  assigneeId?: string | null;
}
