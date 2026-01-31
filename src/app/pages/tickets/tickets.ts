import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tickets',
  imports: [
    RouterLink,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class TicketsComponent {
  // lógica para alternar entre las secciones información de las entradas y su compra
  showTicketForm = false;
}
