import { Injectable } from '@angular/core';

// Modelos
import { Ticket } from '../models/ticket';
import { TicketQuantities } from '../models/ticket-type';

@Injectable({
  providedIn: 'root',
})
export class TicketFactory {

  createTicket(data: {
    date: string;
    quantities: TicketQuantities;
    total: number;
  }): Ticket {

    const adultQty = data.quantities.ADULT ?? 0;
    const childQty = data.quantities.CHILD ?? 0;
    const seniorQty = data.quantities.SENIOR ?? 0;

    return {
      id: this.generateId(),
      date: data.date || new Date().toISOString().split('T')[0],
      quantities: {
        ADULT: Math.max(0, adultQty),
        CHILD: Math.max(0, childQty),
        SENIOR: Math.max(0, seniorQty)
      },
      total: Math.max(0, data.total),
    };
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback simple para entornos sin crypto
    return `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  createFromCurrentState(
    date: string,
    quantities: TicketQuantities,
    total: number
  ): Ticket {
    return this.createTicket({ date, quantities, total });
  }
}
