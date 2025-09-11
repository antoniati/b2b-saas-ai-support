import { TicketsRepository } from "@/features/tickets/repository/tickets-repo";
import { TicketStatus } from "@prisma/client";
import { UnauthorizedError } from "@/shared/errors/unauthorized-errors";
import { requireAuthenticated } from "@/features/tenants/utils/tenants-guards-utils";
import { getPrisma } from "@/shared/lib/prisma";

describe("Row-Level Security (RLS) - TicketsRepository", () => {
  const prismaMock = getPrisma();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const ticketMock = {
    id: global.ticketA1.id,
    subject: global.ticketA1.subject,
    content: global.ticketA1.content,
    status: TicketStatus.OPEN,
    tenantId: global.userA.tenantId,
    creatorId: global.userA.id,
    assigneeId: global.userA.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe("create", () => {
    it("cria ticket com tenantId e creatorId do contexto", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({
        tenantId: global.userA.tenantId,
        userId: global.userA.id,
      });

      (prismaMock.ticket.create as jest.Mock).mockResolvedValue(ticketMock);

      const result = await TicketsRepository.create({
        subject: ticketMock.subject,
        content: ticketMock.content,
      });

      expect(prismaMock.ticket.create).toHaveBeenCalledWith({
        data: {
          subject: ticketMock.subject,
          content: ticketMock.content,
          tenantId: global.userA.tenantId,
          creatorId: global.userA.id,
        },
      });
      expect(result).toEqual(ticketMock);
    });

    it("lança UnauthorizedError se não houver tenantId", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({});

      await expect(
        TicketsRepository.create({ title: "x", description: "y" } as any),
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("list", () => {
    it("retorna tickets filtrados pelo tenant do contexto", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue(global.userA);
      (prismaMock.ticket.findMany as jest.Mock).mockResolvedValue([ticketMock]);

      const result = await TicketsRepository.list();

      expect(prismaMock.ticket.findMany).toHaveBeenCalledWith({
        where: { tenantId: global.userA.tenantId },
        orderBy: { createdAt: "desc" },
        include: { responses: true },
      });
      expect(result).toEqual([ticketMock]);
    });

    it("lança UnauthorizedError se não houver tenantId", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({});

      await expect(TicketsRepository.list()).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("getById", () => {
    it("permite acesso quando tenantId é o mesmo", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue(global.userA);

      (prismaMock.ticket.findFirst as jest.Mock).mockResolvedValue(ticketMock);

      const result = await TicketsRepository.getById(ticketMock.id);

      expect(prismaMock.ticket.findFirst).toHaveBeenCalledWith({
        where: { id: ticketMock.id, tenantId: global.userA.tenantId },
        include: { responses: { orderBy: { createdAt: "asc" } } },
      });
      expect(result).toEqual(ticketMock);
    });

    it("retorna null quando ticket não existe", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue(global.userA);
      (prismaMock.ticket.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await TicketsRepository.getById("ticket-inexistente");
      expect(result).toBeNull();
    });

    it("lança UnauthorizedError se não houver tenantId", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({});

      await expect(TicketsRepository.getById("x")).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });

  describe("updateStatus", () => {
    it("atualiza status filtrando pelo tenantId do contexto", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue(global.userA);
      (prismaMock.ticket.update as jest.Mock).mockResolvedValue({
        ...ticketMock,
        status: TicketStatus.CLOSED,
      });

      const result = await TicketsRepository.updateStatus(
        ticketMock.id,
        TicketStatus.CLOSED,
      );

      expect(prismaMock.ticket.update).toHaveBeenCalledWith({
        where: { id: ticketMock.id, tenantId: global.userA.tenantId },
        data: { status: TicketStatus.CLOSED },
        include: { responses: true },
      });
      expect(result.status).toBe(TicketStatus.CLOSED);
    });

    it("lança UnauthorizedError se não houver tenantId", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({});

      await expect(
        TicketsRepository.updateStatus("x", TicketStatus.CLOSED),
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe("addResponse", () => {
    it("cria resposta vinculada ao ticket e userId do contexto", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue(global.userA);

      (prismaMock.ticketResponse.create as jest.Mock).mockResolvedValue({
        id: global.ticketResponseA1.id,
        ticketId: ticketMock.id,
        senderId: global.userA.id,
        message: "Olá",
        isAi: false,
      });

      const result = await TicketsRepository.addResponse(
        ticketMock.id,
        "Olá tudo bem ?",
        false,
        global.userA.id,
      );

      expect(prismaMock.ticketResponse.create).toHaveBeenCalledWith({
        data: {
          ticketId: ticketMock.id,
          senderId: global.userA.id,
          message: "Olá tudo bem ?",
          isAi: false,
        },
      });
      expect(result.senderId).toBe(global.userA.id);
    });

    it("lança UnauthorizedError se não houver tenantId", async () => {
      (requireAuthenticated as jest.Mock).mockReturnValue({});

      await expect(TicketsRepository.addResponse("x", "Olá")).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
