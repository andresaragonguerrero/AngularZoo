import { Injectable, signal, computed } from '@angular/core';

// Estrategias
import { PriceStrategy } from '../interfaces/price-strategy';
import { MemberPriceStrategy } from '../strategy/member-price.strategy';
import { NonMemberPriceStrategy } from '../strategy/non-member-price.strategy';

// Modelos
import { TicketQuantities } from '../models/ticket-type.interface';

@Injectable({
  providedIn: 'root',
})

export class PriceCalculatorService {
  private _quantities = signal<TicketQuantities>({
    ADULT: 0,
    CHILD: 0,
    SENIOR: 0
  });
  
  private _isMember = signal<boolean>(false);
  
  // Signals públicas
  quantities = this._quantities.asReadonly();
  isMember = this._isMember.asReadonly();
  
  // Estrategia actual basada en si es socio
  private currentStrategy = computed<PriceStrategy>(() => {
    return this._isMember() 
      ? this.memberStrategy 
      : this.nonMemberStrategy;
  });
  
  // Total calculado reactivamente
  total = computed(() => {
    return this.currentStrategy().calculateTotal(this._quantities());
  });
  
  // Precios unitarios reactivos
  unitPrices = computed(() => {
    const strategy = this.currentStrategy();
    return {
      ADULT: strategy.getUnitPrice('ADULT'),
      CHILD: strategy.getUnitPrice('CHILD'),
      SENIOR: strategy.getUnitPrice('SENIOR')
    };
  });
  
  constructor(
    private memberStrategy: MemberPriceStrategy,
    private nonMemberStrategy: NonMemberPriceStrategy
  ) {}
  
  // Métodos para actualizar estado
  updateQuantities(newQuantities: TicketQuantities): void {
    this._quantities.set({
      ADULT: Math.max(0, newQuantities.ADULT || 0),
      CHILD: Math.max(0, newQuantities.CHILD || 0),
      SENIOR: Math.max(0, newQuantities.SENIOR || 0)
    });
  }
  
  updateQuantity(type: keyof TicketQuantities, value: number): void {
    this._quantities.update(current => ({
      ...current,
      [type]: Math.max(0, value)
    }));
  }
  
  setMemberStatus(isMember: boolean): void {
    this._isMember.set(isMember);
  }
  
  // Métodos de ayuda
  getTotalTickets(): number {
    const q = this._quantities();
    return q.ADULT + q.CHILD + q.SENIOR;
  }
  
  reset(): void {
    this._quantities.set({ ADULT: 0, CHILD: 0, SENIOR: 0 });
  }
}
