import { mapPrismaError, validateSchema } from "@/shared";
import {
  Ticket,
  TicketCreateInput,
  TicketCreateSchema,
  TicketResponse,
  TicketsRepository,
} from "@/features/tickets";
import { TicketStatus } from "@prisma/client";

export const TicketsService = {
  /**
   * Cria um novo ticket vinculado ao tenant atual
   */
  async create(values: TicketCreateInput): Promise<Ticket> {
    // 1. Valida os dados do formulário
    const validatedFields = validateSchema(TicketCreateSchema, values);

    // 2. Cria um novo ticket
    try {
      const ticketCreated = await TicketsRepository.create({
        ...validatedFields,
      });

      return ticketCreated; // Retorna o ticket criado
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Lista todos os tickets do tenant atual
   */
  async list(): Promise<Ticket[]> {
    // 1. Tenta listar os tickets
    try {
      const tickets = await TicketsRepository.list();
      return tickets; // Retorna os tickets
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Busca ticket por ID
   */
  async getById(ticketId: string): Promise<Ticket | null> {
    // 1. Tenta buscar o ticket
    try {
      const ticket = await TicketsRepository.getById(ticketId);
      return ticket; // Retorna o ticket
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Atualiza status do ticket
   */
  async updateStatus(
    ticketId: string,
    status: Ticket["status"],
  ): Promise<{ status: TicketStatus }> {
    // 1. Tenta atualizar o status
    try {
      const ticket = await TicketsRepository.updateStatus(ticketId, status);
      return { status: ticket.status }; // Retorna o ticket
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  /**
   * Adiciona uma resposta ao ticket
   */
  async addResponse(
    ticketId: string,
    message: string,
    isAi = false,
    senderId?: string,
  ): Promise<TicketResponse> {
    try {
      const ticketReponse = await TicketsRepository.addResponse(
        ticketId,
        message,
        isAi,
        senderId,
      );
      return ticketReponse;
    } catch (error) {
      throw mapPrismaError(error);
    }
  },
};
