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
import { TicketService } from '../../services/ticket.service';
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
  ticketService = inject(TicketService);

  ticketForm: FormGroup = this.fb.group(
    {
      date: ['', Validators.required],
      hour: ['', Validators.required],
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

  availableHours: string[] = [];

  private readonly OPEN_HOUR = 14;
  private readonly CLOSE_HOUR = 22;

  today: string = this.getToday();

  private minOneTicketValidator(control: AbstractControl): ValidationErrors | null {
    const { senior, adult, child } = control.value;

    const totalTickets =
      (Number(senior) || 0) +
      (Number(adult) || 0) +
      (Number(child) || 0);

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

  onDateChange(): void {
    const today = new Date();
    const selectedDate = this.ticketForm.get('date')?.value;

    if (!selectedDate) {
      this.availableHours = [];
      return;
    }

    const date = new Date(selectedDate);
    const day = date.getDay();

    today.setHours(0, 0, 0, 0);

    if (date <= today) {
      this.availableHours = [];
      this.ticketForm.get('date')?.setErrors({ pastDate: true });
      return;
    }

    const isOpenDay = [0, 3, 4, 5, 6].includes(day);

    if (!isOpenDay) {
      this.availableHours = [];
      this.ticketForm.get('hour')?.setValue('');
      return;
    }

    this.generateHours();
  }

  confirmPurchase(): void {
    const date = this.ticketForm.get('date')?.value;
    const hour = this.ticketForm.get('hour')?.value;

    if (!date || !hour) return;

    const quantities = this.priceCalculator.quantities();
    const totalPrice = this.priceCalculator.total();

    const result = this.ticketService.purchase({
      date,
      hour,
      quantities,
      total: totalPrice
    });

    if (!result.success) {
      alert('No hay suficientes plazas disponibles para esta hora.');
      return;
    }

    console.log('Compra confirmada y plazas reservadas', result.ticket);

    this.showSummary = false;
    this.ticketForm.reset();
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

  // Generar horas dinámicamente
  private generateHours(): void {
    this.availableHours = [];

    for (let hour = this.OPEN_HOUR; hour < this.CLOSE_HOUR; hour++) {
      const formatted = `${hour.toString().padStart(2, '0')}:00`;
      this.availableHours.push(formatted);
    }
  }

  private getToday(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }
}
