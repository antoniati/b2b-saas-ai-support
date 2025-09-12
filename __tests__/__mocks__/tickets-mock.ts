import { z } from "zod";

jest.mock("@/features/tickets/services/tickets-service", () => ({
  TicketsService: {
    create: jest.fn(),
    list: jest.fn(),
    getById: jest.fn(),
    updateStatus: jest.fn(),
    addResponse: jest.fn(),
    TicketCreateSchema: z.object({
      title: z.string(),
      description: z.string(),
    }),
  },
}));
