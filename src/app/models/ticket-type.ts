export type TicketType = 'ADULT' | 'CHILD' | 'SENIOR';

export interface TicketPrice {
  type: TicketType;
  basePrice: number;
  label: string;
}

export const TICKET_PRICES: TicketPrice[] = [
  { type: 'ADULT', basePrice: 20, label: 'Adulto' },
  { type: 'CHILD', basePrice: 12, label: 'Niño' },
  { type: 'SENIOR', basePrice: 15, label: 'Senior' } // cambiar a anciano en un futuro
];

export interface TicketQuantities {
  ADULT: number;
  CHILD: number;
  SENIOR: number;
}
