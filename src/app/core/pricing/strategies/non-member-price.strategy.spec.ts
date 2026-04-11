import { NonMemberPriceStrategy } from './non-member-price.strategy';
import { TICKET_PRICES } from '../../../features/tickets/models/ticket-type.interface';

describe('NonMemberPriceStrategy', () => {
  let strategy: NonMemberPriceStrategy;

  beforeEach(() => {
    strategy = new NonMemberPriceStrategy();
  });

  describe('getUnitPrice', () => {
    it('debería retornar precio completo para adulto', () => {
      const adultPrice = TICKET_PRICES.find(t => t.type === 'ADULT')!.basePrice;
      expect(strategy.getUnitPrice('ADULT')).toBe(adultPrice);
    });

    it('debería retornar precio completo para niño', () => {
      const childPrice = TICKET_PRICES.find(t => t.type === 'CHILD')!.basePrice;
      expect(strategy.getUnitPrice('CHILD')).toBe(childPrice);
    });

    it('debería retornar precio completo para senior', () => {
      const seniorPrice = TICKET_PRICES.find(t => t.type === 'SENIOR')!.basePrice;
      expect(strategy.getUnitPrice('SENIOR')).toBe(seniorPrice);
    });

    it('debería retornar 0 para tipo desconocido', () => {
      expect(strategy.getUnitPrice('UNKNOWN')).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('debería calcular total SIN descuento', () => {
      const quantities: any = {
        ADULT: 2,  // 20€ cada uno = 40€
        CHILD: 1,  // 12€ = 12€
        SENIOR: 1  // 15€ = 15€
      };
      // Total: 40 + 12 + 15 = 67
      
      expect(strategy.calculateTotal(quantities)).toBe(67);
    });

    it('debería retornar 0 cuando no hay entradas', () => {
      const quantities: any = { ADULT: 0, CHILD: 0, SENIOR: 0 };
      expect(strategy.calculateTotal(quantities)).toBe(0);
    });

    it('debería calcular solo adultos', () => {
      const quantities: any = { ADULT: 3, CHILD: 0, SENIOR: 0 };
      // 3 * 20 = 60
      expect(strategy.calculateTotal(quantities)).toBe(60);
    });

    it('debería ignorar tipos no existentes', () => {
      const quantities: any = { 
        ADULT: 2, 
        UNKNOWN: 5, // Debería ser ignorado (precio 0)
        CHILD: 1 
      };
      // Solo cuenta ADULT y CHILD: 40 + 12 = 52
      expect(strategy.calculateTotal(quantities)).toBe(52);
    });
  });

  it('debería ser instanciable', () => {
    expect(strategy).toBeTruthy();
  });
});