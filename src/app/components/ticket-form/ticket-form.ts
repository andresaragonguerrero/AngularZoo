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

import { PriceCalculatorService } from '../../services/price-calculator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss',
})
export class TicketForm {
  private readonly fb = inject(FormBuilder);
  private readonly priceCalculator = inject(PriceCalculatorService);
  private readonly authService = inject(AuthService);

  ticketForm: FormGroup = this.fb.group(
    {
      senior: [0, [Validators.min(0), Validators.required]],
      adult: [0, [Validators.min(0), Validators.required]],
      child: [0, [Validators.min(0), Validators.required]],
    },
    { validators: this.minOneTicketValidator }
  );

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
  }
}
