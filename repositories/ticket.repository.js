import { TicketDAO } from '../dao/ticket.dao.js';
import { TicketDTO } from '../dto/ticket.dto.js';

export class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }

  async createTicket(ticketData) {
    const ticket = await this.dao.create(ticketData);
    return new TicketDTO(ticket);
  }

  async getTicketById(id) {
    const ticket = await this.dao.findById(id);
    return ticket ? new TicketDTO(ticket) : null;
  }

  async getTicketByCode(code) {
    const ticket = await this.dao.findByCode(code);
    return ticket ? new TicketDTO(ticket) : null;
  }

  async getTicketsByPurchaser(email) {
    const tickets = await this.dao.findByPurchaser(email);
    return tickets.map(ticket => new TicketDTO(ticket));
  }

  async getAllTickets() {
    const tickets = await this.dao.findAll();
    return tickets.map(ticket => new TicketDTO(ticket));
  }
}

export const ticketRepository = new TicketRepository();
