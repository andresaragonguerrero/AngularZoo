import { TicketQuantities } from "../models/ticket-type.interface";

export interface PriceStrategy {
  calculateTotal(quantities: TicketQuantities): number;
  getUnitPrice(ticketType: string): number;
}