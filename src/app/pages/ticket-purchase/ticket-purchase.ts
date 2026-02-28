import { Component, EventEmitter, Output } from '@angular/core';

// Componentes
import { TicketForm } from "../../components/ticket-form/ticket-form";

@Component({
  selector: 'app-ticket-purchase',
  imports: [
    TicketForm
  ],
  templateUrl: './ticket-purchase.html',
  styleUrl: './ticket-purchase.scss',
})
export class TicketPurchase {

  @Output() buyClicked = new EventEmitter<void>();

  onBuyClicked() {
    this.buyClicked.emit();
  }
}
