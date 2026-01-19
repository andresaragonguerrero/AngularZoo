import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { PriceCalculatorService } from '../../services/price-calculator.service';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-card',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {

  private readonly priceCalculator = inject(PriceCalculatorService);
  private readonly ticketService = inject(TicketService);
  private readonly formbuilder = inject(FormBuilder);

  ticketForm: FormGroup;

  constructor() {
    this.ticketForm = this.formbuilder.group({
      senior: [0, [Validators.min(0), Validators.required]],
      adult: [0, [Validators.min(0), Validators.required]],
      child: [0, [Validators.min(0), Validators.required]]
    }, {
      validators: this.minOneTicketValidator.bind(this)
    });

    console.log('Formulario inicializado:', this.ticketForm.valid);
  }

  seniorQuantity = 0;
  adultQuantity = 0;
  childQuantity = 0;

  private minOneTicketValidator(control: AbstractControl): ValidationErrors | null {
    const values = control.value;
    const total = Object.values(values).reduce(
      (sum: number, val: any) => sum + (Number(val) || 0),
      0
    );
    return total >= 1 ? null : { minOneTicket: true };
  }

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

    this.ticketForm.markAllAsTouched();

    // Se valida el formulario
    if (this.ticketForm.invalid) {
      console.error('Formulario inválido - Hay valores negativos');
      return;
    }

    // Se obtienen los valores del formulario
    const values = this.ticketForm.value;
    console.log('Valores del formulario:', values);

    // Se actualiza el servicio
    this.priceCalculator.updateQuantity('SENIOR', values.senior);
    this.priceCalculator.updateQuantity('ADULT', values.adult);
    this.priceCalculator.updateQuantity('CHILD', values.child);

    const quantities = this.priceCalculator.quantities();
    const total = this.priceCalculator.total();

    const ticket = this.ticketService.createAndSaveTicket({
      date: new Date().toISOString().split('T')[0],
      quantities,
      total
    });

    console.log('Compra exitosa. Ticket:', ticket);

    // Se resetea
    this.priceCalculator.reset();
    this.ticketForm.reset({ senior: 0, adult: 0, child: 0 });
  }
}
