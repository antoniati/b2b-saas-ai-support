"use server";

import { TicketStatus } from "@prisma/client";

import { getPrismaClient } from "@/shared/utils/prisma-utils";
import { requireAuthenticated } from "@/features/tenants/utils/tenants-guards-utils";
import type {
  Ticket,
  TicketCreateInput,
} from "@/features/tickets/types/tickets-types";
import { ForbiddenError, UnauthorizedError } from "@/shared";

export const TicketsRepository = {
  /**
   * Cria um novo ticket
   */
  async create(values: TicketCreateInput): Promise<Ticket> {
    const ctx = requireAuthenticated();

    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const prisma = await getPrismaClient();

    return await prisma.ticket.create({
      data: {
        ...values,
        tenantId: ctx.tenantId,
        creatorId: ctx.userId,
      },
    });
  },

  /**
   * Lista todos os tickets do tenant atual
   */
  async list(): Promise<Ticket[]> {
    const ctx = requireAuthenticated();

    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const prisma = await getPrismaClient();

    return await prisma.ticket.findMany({
      where: {
        tenantId: ctx.tenantId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        responses: true,
      },
    });
  },

  /**
   * Busca um ticket específico por ID (com responses)
   */
  async getById(ticketId: string): Promise<Ticket | null> {
    const ctx = requireAuthenticated();

    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const prisma = await getPrismaClient();

    return await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        tenantId: ctx.tenantId,
      },
      include: {
        responses: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  },

  /**
   * Atualiza o status do ticket
   */
  async updateStatus(ticketId: string, status: TicketStatus): Promise<Ticket> {
    const ctx = requireAuthenticated();

    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    const prisma = await getPrismaClient();

    return await prisma.ticket.update({
      where: {
        id: ticketId,
        tenantId: ctx.tenantId,
      },
      data: {
        status,
      },
      include: {
        responses: true,
      },
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
  ) {
    const ctx = requireAuthenticated();

    if (!ctx?.tenantId) {
      throw new UnauthorizedError();
    }

    if (ctx.userId && ctx.userId !== senderId) {
      throw new ForbiddenError();
    }

    const prisma = await getPrismaClient();

    return await prisma.ticketResponse.create({
      data: {
        ticketId,
        senderId: senderId || ctx.userId,
        message,
        isAi,
      },
    });
  },
};
