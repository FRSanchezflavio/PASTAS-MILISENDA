import Ticket from '../models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';

export class TicketDAO {
  async create(ticketData) {
    const ticket = new Ticket({
      ...ticketData,
      code: this.generateUniqueCode()
    });
    return await ticket.save();
  }

  async findById(id) {
    return await Ticket.findById(id);
  }

  async findByCode(code) {
    return await Ticket.findOne({ code });
  }

  async findByPurchaser(email) {
    return await Ticket.find({ purchaser: email }).sort({ purchase_datetime: -1 });
  }

  async findAll() {
    return await Ticket.find().sort({ purchase_datetime: -1 });
  }

  generateUniqueCode() {
    return `TICKET-${uuidv4()}`;
  }
}
