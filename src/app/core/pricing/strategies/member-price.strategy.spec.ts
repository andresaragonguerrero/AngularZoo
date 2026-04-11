import { MemberPriceStrategy } from './member-price.strategy';
import { TICKET_PRICES } from '../../../features/tickets/models/ticket-type.interface';

describe('MemberPriceStrategy', () => {
  let strategy: MemberPriceStrategy;

  beforeEach(() => {
    strategy = new MemberPriceStrategy();
  });

  describe('getUnitPrice', () => {
    it('debería aplicar 50% descuento a precio adulto', () => {
      const adultPrice = TICKET_PRICES.find(t => t.type === 'ADULT')!.basePrice;
      const expected = adultPrice * 0.5; // 50% descuento
      
      expect(strategy.getUnitPrice('ADULT')).toBe(expected);
    });

    it('debería aplicar 50% descuento a precio niño', () => {
      const childPrice = TICKET_PRICES.find(t => t.type === 'CHILD')!.basePrice;
      const expected = childPrice * 0.5;
      
      expect(strategy.getUnitPrice('CHILD')).toBe(expected);
    });

    it('debería aplicar 50% descuento a precio senior', () => {
      const seniorPrice = TICKET_PRICES.find(t => t.type === 'SENIOR')!.basePrice;
      const expected = seniorPrice * 0.5;
      
      expect(strategy.getUnitPrice('SENIOR')).toBe(expected);
    });

    it('debería retornar 0 para tipo de ticket desconocido', () => {
      expect(strategy.getUnitPrice('UNKNOWN')).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('debería calcular total con descuento para múltiples entradas', () => {
      const quantities: any = {
        ADULT: 2,  // 20€ cada uno → 10€ con descuento = 20€
        CHILD: 1,  // 12€ → 6€ con descuento = 6€
        SENIOR: 1  // 15€ → 7.5€ con descuento = 7.5€
      };
      // Total esperado: 20 + 6 + 7.5 = 33.5
      
      const total = strategy.calculateTotal(quantities);
      expect(total).toBe(33.5);
    });

    it('debería retornar 0 cuando no hay entradas', () => {
      const quantities: any = { ADULT: 0, CHILD: 0, SENIOR: 0 };
      expect(strategy.calculateTotal(quantities)).toBe(0);
    });

    it('debería manejar solo un tipo de entrada', () => {
      const quantities: any = { ADULT: 3, CHILD: 0, SENIOR: 0 };
      // 3 adultos * 10€ (con descuento) = 30€
      expect(strategy.calculateTotal(quantities)).toBe(30);
    });
  });

  it('debería ser instanciable', () => {
    expect(strategy).toBeTruthy();
  });
});