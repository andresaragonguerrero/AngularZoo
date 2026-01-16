import { Injectable } from "@angular/core";

import { PriceStrategy } from "../interfaces/price-strategy";
import { TicketQuantities, TICKET_PRICES } from '../models/ticket-type';

@Injectable({ providedIn: 'root' })
export class NonMemberPriceStrategy implements PriceStrategy {
  calculateTotal(quantities: TicketQuantities): number {
    let total = 0;

    Object.entries(quantities).forEach(([type, quantity]) => {
      const unitPrice = this.getUnitPrice(type);
      total += unitPrice * quantity;
    });

    return total;
  }

  getUnitPrice(ticketType: string): number {
    const ticket = TICKET_PRICES.find(t => t.type === ticketType);
    return ticket ? ticket.basePrice : 0;
  }
}
