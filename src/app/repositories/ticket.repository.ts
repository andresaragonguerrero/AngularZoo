import { Injectable } from '@angular/core';

// Modelos
import { Ticket } from '../models/ticket';

@Injectable({ providedIn: 'root' })

export class TicketRepository {
  private readonly STORAGE_KEY = 'zoo_tickets';

  // Guarda una nueva entrada
  save(ticket: Ticket): void {
    const tickets = this.findAll();
    tickets.push(ticket);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
  }

  // Recupera todas las entradas
  findAll(): Ticket[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Busca una entrada por su ID
  findById(id: string): Ticket | undefined {
    const tickets = this.findAll();
    return tickets.find(ticket => ticket.id === id);
  }

  // Elimina una entrada por su ID
  delete(id: string): void {
    const tickets = this.findAll();
    const filteredTickets = tickets.filter(ticket => ticket.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredTickets));
  }

  // Elimina todas las entradas
  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Obtiene la última entrada
  findLatest(): Ticket | undefined {
    const tickets = this.findAll();
    return tickets.length > 0 ? tickets[tickets.length - 1] : undefined;
  }

  // Obtiene el número total de entradas guardadas
  count(): number {
    return this.findAll().length;
  }
}