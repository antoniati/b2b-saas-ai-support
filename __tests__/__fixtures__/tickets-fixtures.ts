import { TicketStatus } from "@prisma/client";
import { ticketResponseA1, ticketResponseB1 } from "./ticket-response-fixtures";
import { userA, userB } from "./users-fixture";

export const ticketA1 = {
  id: "ticket-a1",
  subject: "Ticket A1",
  content: "Conteudo A1",
  status: "OPEN" as TicketStatus,
  tenantId: userA.tenantId,
  creatorId: userA.id,
  assigneeId: userA.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  responses: {
    create: [ticketResponseA1],
  },
};

export const ticketB1 = {
  id: "ticket-b1",
  subject: "Ticket B1",
  content: "Conteudo B1",
  status: "OPEN" as TicketStatus,
  tenantId: userB.tenantId,
  creatorId: userB.id,
  assigneeId: userB.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  responses: {
    create: [ticketResponseB1],
  },
};
