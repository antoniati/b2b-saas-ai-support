"use server";

import { z } from "zod";

import { TenantService } from "@/features/tenants";
import { ActionResponse, handleAction } from "@/shared";
import { TicketsService, TicketCreateSchema } from "@/features/tickets";

export const TicketsAction = {
  /**
   * Cria um novo ticket
   */
  async create(
    values: z.infer<typeof TicketCreateSchema>,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      // garante que existe um tenant no contexto
      await TenantService.checkTenantInContext();

      const ticket = await TicketsService.create(values);
      // retorna um identificador simples para o consumidor da action
      return ticket;
    });
  },

  /**
   * Lista tickets do usuário atual
   */
  async list(): Promise<ActionResponse> {
    return handleAction(async () => {
      const tickets = await TicketsService.list();
      return tickets;
    });
  },

  /**
   * Busca ticket por id do ticket
   */
  async getById(id: string): Promise<ActionResponse> {
    return handleAction(async () => {
      const ticket = await TicketsService.getById(id);
      return ticket;
    });
  },

  /**
   * Atualiza status do ticket (OPEN | PENDING | RESOLVED | CLOSED)
   */
  async updateStatus(id: string, status: string): Promise<ActionResponse> {
    return handleAction(async () => {
      const ticket = await TicketsService.updateStatus(id, status as any);
      return { status: ticket.status };
    });
  },

  /**
   * Adiciona uma resposta (mensagem) ao ticket
   */
  async addResponse(
    ticketId: string,
    message: string,
    isAi = false,
    senderId?: string,
  ): Promise<ActionResponse> {
    return handleAction(async () => {
      const response = await TicketsService.addResponse(
        ticketId,
        message,
        isAi,
        senderId,
      );

      return response;
    });
  },
};
