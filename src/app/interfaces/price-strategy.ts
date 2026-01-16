import { TicketQuantities } from "../models/ticket-type";

export interface PriceStrategy {
  calculateTotal(quantities: TicketQuantities): number;
  getUnitPrice(ticketType: string): number;
}