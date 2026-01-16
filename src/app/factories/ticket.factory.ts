import { Injectable } from '@angular/core';

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
    return {
      id: this.generateId(),
      date: data.date || new Date().toISOString().split('T')[0], // Solo fecha YYYY-MM-DD
      quantities: {
        ADULT: Math.max(0, data.quantities.ADULT),
        CHILD: Math.max(0, data.quantities.CHILD),
        SENIOR: Math.max(0, data.quantities.SENIOR)
      },
      total: Math.max(0, data.total),
      // isMember y discountApplied se añadirán después
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
