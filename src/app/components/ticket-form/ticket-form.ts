import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Servicios
import { PriceCalculatorService } from '../../services/price-calculator.service';

// Componentes
import { TicketSummaryModal } from '../ticket-summary-modal/ticket-summary-modal';

@Component({
  selector: 'app-ticket-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TicketSummaryModal
  ],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss',
})
export class TicketForm {
  private readonly fb = inject(FormBuilder);
  priceCalculator = inject(PriceCalculatorService);

  ticketForm: FormGroup = this.fb.group(
    {
      senior: [0, [Validators.min(0), Validators.required]],
      adult: [0, [Validators.min(0), Validators.required]],
      child: [0, [Validators.min(0), Validators.required]],
    },
    { validators: this.minOneTicketValidator }
  );

  showSummary = false;

  // Exponer signals al template
  isMember = this.priceCalculator.isMember;
  unitPrices = this.priceCalculator.unitPrices;
  total = this.priceCalculator.total;

  private minOneTicketValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const values = control.value as {
      senior: number;
      adult: number;
      child: number;
    };

    const totalTickets = Object.values(values).reduce(
      (sum: number, val: number) => sum + (val || 0),
      0
    );

    return totalTickets >= 1 ? null : { minOneTicket: true };
  }

  onBuyClick(): void {
    this.ticketForm.markAllAsTouched();

    if (this.ticketForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const { senior, adult, child } = this.ticketForm.value;

    // Actualizar cantidades en el servicio
    this.priceCalculator.updateQuantities({
      SENIOR: senior,
      ADULT: adult,
      CHILD: child,
    });

    // Leer total calculado por la estrategia
    const totalPrice = this.priceCalculator.total();
    const quantities = this.priceCalculator.quantities();
    const isMember = this.priceCalculator.isMember();

    console.log('COMPRA');
    console.log('Tipo de usuario:', isMember ? 'SOCIO' : 'NO SOCIO');
    console.log('Cantidades:', quantities);
    console.log('TOTAL:', totalPrice, '€');

    this.showSummary = true;
  }

  confirmPurchase(): void {
    console.log('Compra confirmada');
    this.showSummary = false;

    // (más adelante aquí irá TicketService.createAndSaveTicket)
  }

  // Funcionalidad para seleccionar la cantidad de entradas (Numeric Stepper)
  increment(controlName: 'senior' | 'adult' | 'child') {
    const control = this.ticketForm.get(controlName);
    control?.setValue((control.value ?? 0) + 1);
  }

  decrement(controlName: 'senior' | 'adult' | 'child') {
    const control = this.ticketForm.get(controlName);
    const value = control?.value ?? 0;
    control?.setValue(Math.max(0, value - 1));
  }

}
