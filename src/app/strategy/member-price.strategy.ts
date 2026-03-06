import { Injectable } from "@angular/core";

// Estrategias
import { PriceStrategy } from "../interfaces/price-strategy";

// Modelos
import { TicketQuantities, TICKET_PRICES } from '../models/ticket-type.interface';

@Injectable({ providedIn: 'root' })

export class MemberPriceStrategy implements PriceStrategy {
  private readonly DISCOUNT = 0.5; // descuento base por ser socio del 50%

  calculateTotal(quantities: TicketQuantities): number {
    let total = 0;

    Object.entries(quantities).forEach(([type, quantity]) => {
      const unitPrice = this.getUnitPrice(type);
      total += unitPrice * quantity;
    });

    return total;
  } // calcular el precio total de las entradas

  getUnitPrice(ticketType: string): number {
    const ticket = TICKET_PRICES.find(t => t.type === ticketType);
    if (!ticket) return 0;

    return ticket.basePrice * (1 - this.DISCOUNT);
  }
}
