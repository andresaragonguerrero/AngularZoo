import { Component } from '@angular/core';

import { TicketPurchase } from "../../sections/ticket-purchase/ticket-purchase";
import { TicketForm } from '../../sections/ticket-form/ticket-form';

@Component({
  selector: 'app-tickets',
  imports: [
    TicketPurchase,
    TicketForm,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class TicketsComponent {
  // lógica para alternar entre las secciones información de las entradas y su compra
  showTicketForm = false;
}
