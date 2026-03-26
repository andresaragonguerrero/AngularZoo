import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Modelos
import { TicketQuantities } from '../../models/ticket-type.interface';


@Component({
  selector: 'app-ticket-summary-modal',
  imports: [
    TranslateModule,
  ],
  templateUrl: './ticket-summary-modal.html',
  styleUrl: './ticket-summary-modal.scss',
})
export class TicketSummaryModal {
  @Input() quantities!: TicketQuantities;
  @Input() total!: number;
  @Input() isMember!: boolean;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
