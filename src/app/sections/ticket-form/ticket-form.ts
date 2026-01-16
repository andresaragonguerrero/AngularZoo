import { Component} from '@angular/core';

import { TicketCard } from '../../components/ticket-card/ticket-card';

@Component({
  selector: 'app-ticket-form',
  imports: [
    TicketCard,
  ],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss',
})
export class TicketForm {}
