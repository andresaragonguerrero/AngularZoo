import { Injectable, inject } from '@angular/core';

// Factorías
import { TicketFactory } from '../factories/ticket.factory';

// Repositorios
import { TicketRepository } from '../repositories/ticket.repository';

// Modelos
import { Ticket } from '../models/ticket';

// Servicios
import { AvailabilityService } from './availability.service';
import { PriceCalculatorService } from './price-calculator.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {

  private factory = inject(TicketFactory);
  private repository = inject(TicketRepository);
  private availabilityService = inject(AvailabilityService);
  private priceCalculator = inject(PriceCalculatorService);

  // crea y guarda una nueva entrada
  createAndSaveTicket(data: {
    date: string;
    hour: string;
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
    senior: number;
    child: number;
    adult: number;
    isMember: boolean;
  }): { success: boolean; ticket?: Ticket } {

    const totalTickets =
      data.senior +
      data.adult +
      data.child;

    const available = this.availabilityService.checkAvailability(
      data.date,
      data.hour,
      totalTickets
    );

    if (!available) {
      return { success: false };
    }

    this.priceCalculator.setMemberStatus(data.isMember);

    this.priceCalculator.updateQuantities({
      SENIOR: data.senior,
      ADULT: data.adult,
      CHILD: data.child
    });

    const totalPrice = this.priceCalculator.total();

    this.availabilityService.reserve(
      data.date,
      data.hour,
      totalTickets
    );

    const ticket = this.factory.createTicket({
      date: data.date,
      hour: data.hour,
      quantities: {
        SENIOR: data.senior,
        ADULT: data.adult,
        CHILD: data.child
      },
      total: totalPrice
    });

    this.repository.save(ticket);

    return { success: true, ticket };
  }
}
