import { Component, inject } from '@angular/core';

import { PriceCalculatorService } from '../../services/price-calculator.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-card',
  imports: [],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  // private readonly priceCalculator = inject(PriceCalculatorService);

  constructor(
    private readonly priceCalculator: PriceCalculatorService,
    private readonly ticketService: TicketService
  ) { }

  seniorQuantity = 0;
  adultQuantity = 0;
  childQuantity = 0;

  // Manejar cambios en los inputs
  onSeniorChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.seniorQuantity = parseInt(value) || 0;
    this.priceCalculator.updateQuantity('SENIOR', this.seniorQuantity);
  }

  onAdultChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.adultQuantity = parseInt(value) || 0;
    this.priceCalculator.updateQuantity('ADULT', this.adultQuantity);
  }

  onChildChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.childQuantity = parseInt(value) || 0;
    this.priceCalculator.updateQuantity('CHILD', this.childQuantity);
  }

  // Función del botón de compra
  onBuyClick(): void {
    const quantities = this.priceCalculator.quantities();
    const total = this.priceCalculator.total();

    // crear y guardar ticket
    const ticket = this.ticketService.createAndSaveTicket({
      date: new Date().toISOString().split('T')[0], // Fecha por defecto
      quantities,
      total
    });

    // a modo de test
    const totalTickets = this.priceCalculator.getTotalTickets();

    // test
    console.log('=== RESUMEN DE COMPRA ===');
    console.log(`Entradas Senior: ${this.seniorQuantity}`);
    console.log(`Entradas Adulto: ${this.adultQuantity}`);
    console.log(`Entradas Niño: ${this.childQuantity}`);
    console.log(`Total entradas: ${totalTickets}`);
    console.log(`Precio total: €${total.toFixed(2)}`);
    console.log('=========================');

    // verifica si el servicio está funcionando
    console.log('Servicio - total signal:', this.priceCalculator.total());
    console.log('Servicio - quantities:', this.priceCalculator.quantities());

    // mostrar confirmación
    console.log('Ticket guardado:', ticket);

    // resetear formulario
    this.priceCalculator.reset();
    this.seniorQuantity = this.adultQuantity = this.childQuantity = 0;
  }
}
