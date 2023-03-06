import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class TicketsService {
  async createTicket(eventId) {
    const res = await api.post(`api/tickets/${eventId}`);
    logger.log("[CREATED TICKET]", res.data);
    AppState.tickets.push(res.data);
    AppState.ticketHolders.push(res.data);
    AppState.activeEvent.capacity--;
  }

  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`);
    logger.log("[DELETED TICKET]", res.data);
    AppState.tickets = AppState.tickets.filter(
      (ticket) => ticket.id != ticketId
    );
    AppState.ticketHolders = AppState.ticketHolders.filter(
      (ticket) => ticket.id != ticketId
    );
    AppState.activeEvent.capacity++;
  }
}

export const ticketsService = new TicketsService();
