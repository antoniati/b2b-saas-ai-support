import { TicketsAction } from "@/features/tickets/server-actions/tickets-action";
import { TicketsService } from "@/features/tickets/services/tickets-service";
import { TenantService } from "@/features/tenants/services/tenants-service";
import { SUCCESS_MESSAGES } from "@/shared";

describe("TicketsAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("deve criar um ticket chamando o service e retornando o resultado", async () => {
      (TenantService.checkTenantInContext as jest.Mock).mockResolvedValue({
        id: global.tenantA.id,
        name: global.tenantA.name,
        slug: global.tenantA.slug,
      });

      (TicketsService.create as jest.Mock).mockResolvedValue(global.ticketA1);

      const result = await TicketsAction.create({
        subject: global.ticketA1.subject,
        content: global.ticketA1.content,
      });

      expect(TenantService.checkTenantInContext).toHaveBeenCalled();
      expect(TicketsService.create).toHaveBeenCalledWith({
        subject: global.ticketA1.subject,
        content: global.ticketA1.content,
      });
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
        data: global.ticketA1,
      });
    });
  });

  describe("list", () => {
    it("deve listar todos os tickets do usuário", async () => {
      const tickets = [global.ticketA1];
      (TicketsService.list as jest.Mock).mockResolvedValue(tickets);

      const result = await TicketsAction.list();

      expect(TicketsService.list).toHaveBeenCalled();
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
        data: tickets,
      });
    });
  });

  describe("getById", () => {
    it("deve buscar um ticket pelo ID", async () => {
      (TicketsService.getById as jest.Mock).mockResolvedValue(global.ticketA1);

      const result = await TicketsAction.getById(global.ticketA1.id);

      expect(TicketsService.getById).toHaveBeenCalledWith(global.ticketA1.id);
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
        data: global.ticketA1,
      });
    });
  });

  describe("updateStatus", () => {
    it("deve atualizar o status de um ticket", async () => {
      (TicketsService.updateStatus as jest.Mock).mockResolvedValue({
        status: "RESOLVED",
      });

      const result = await TicketsAction.updateStatus(
        global.ticketA1.id,
        "RESOLVED",
      );

      expect(TicketsService.updateStatus).toHaveBeenCalledWith(
        global.ticketA1.id,
        "RESOLVED",
      );
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
        data: { status: "RESOLVED" },
      });
    });
  });

  describe("addResponse", () => {
    it("deve adicionar uma resposta ao ticket", async () => {
      (TicketsService.addResponse as jest.Mock).mockResolvedValue(
        global.ticketA1,
      );

      const result = await TicketsAction.addResponse(
        global.ticketA1.id,
        "Teste",
      );

      expect(TicketsService.addResponse).toHaveBeenCalledWith(
        global.ticketA1.id,
        "Teste",
        false,
        undefined,
      );
      expect(result).toEqual({
        ok: true,
        status: 200,
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
        data: global.ticketA1,
      });
    });
  });
});
