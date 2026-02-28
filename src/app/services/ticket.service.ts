import { Injectable, inject } from '@angular/core';

// Factorías
import { TicketFactory } from '../factories/ticket.factory';

// Repositorios
import { TicketRepository } from '../repositories/ticket.repository';

// Modelos
import { Ticket } from '../models/ticket';

// Servicios
import { AvailabilityService } from './availability.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private factory = inject(TicketFactory);
  private repository = inject(TicketRepository);
  private availabilityService = inject(AvailabilityService);

  // crea y guarda una nueva entrada
  createAndSaveTicket(data: {
    date: string;
    quantities: { ADULT: number; CHILD: number; SENIOR: number };
    total: number;
  }): Ticket {

    // crea la entrada
    const ticket = this.factory.createTicket(data);

    // guarda en el repositorio
    this.repository.save(ticket);

    return ticket;
  }

  // obtiene todas las entradas
  getAllTickets(): Ticket[] {
    return this.repository.findAll();
  }

  // elimina una entrada por su id
  deleteTicket(id: string): void {
    this.repository.delete(id);
  }

  // Vacía los datos de las entradas
  clearAllTickets(): void {
    this.repository.clear();
  }

  // Compra de una entrada
  purchase(data: {
    date: string;
    hour: string;
    quantities: { ADULT: number; CHILD: number; SENIOR: number };
    total: number;
  }): { success: boolean; ticket?: Ticket } {

    const quantity =
      data.quantities.ADULT +
      data.quantities.CHILD +
      data.quantities.SENIOR;

    const available = this.availabilityService.checkAvailability(
      data.date,
      data.hour,
      quantity
    );

    if (!available) {
      return { success: false };
    }

    this.availabilityService.reserve(
      data.date,
      data.hour,
      quantity
    );

    const ticket = this.factory.createTicket(data);

    this.repository.save(ticket);

    return { success: true, ticket };
  }
}
