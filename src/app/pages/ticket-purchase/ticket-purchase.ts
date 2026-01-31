import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-purchase',
  imports: [],
  templateUrl: './ticket-purchase.html',
  styleUrl: './ticket-purchase.scss',
})
export class TicketPurchase {

  @Output() buyClicked = new EventEmitter<void>();

  onBuyClicked() {
    this.buyClicked.emit();
  }
}
