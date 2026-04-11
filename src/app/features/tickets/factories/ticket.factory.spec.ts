import { TicketFactory } from './ticket.factory';
import { TicketQuantities } from '../models/ticket-type.interface';

describe('TicketFactory', () => {
  let factory: TicketFactory;

  beforeEach(() => {
    factory = new TicketFactory();
  });

  describe('generateId', () => {
    it('debería generar un ID único', () => {
      const id1 = (factory as any).generateId();
      const id2 = (factory as any).generateId();
      
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
    });
  });

  describe('createTicket', () => {
    it('debería prevenir cantidades negativas', () => {
      const data = {
        date: '2024-01-20',
        quantities: { ADULT: -5, CHILD: 0, SENIOR: -1 } as TicketQuantities,
        total: -30
      };
      
      const ticket = factory.createTicket(data);
      
      expect(ticket.quantities.ADULT).toBe(0);
      expect(ticket.quantities.SENIOR).toBe(0);
      expect(ticket.total).toBe(0);
    });

    it('debería usar fecha por defecto si no se proporciona', () => {
      const data = {
        date: '',
        quantities: { ADULT: 1, CHILD: 0, SENIOR: 0 } as TicketQuantities,
        total: 20
      };
      
      const ticket = factory.createTicket(data);
      
      expect(ticket.date).toBeTruthy();
    });

    it('debería crear un ticket con datos básicos', () => {
      const data = {
        date: '2024-01-20',
        quantities: { ADULT: 2, CHILD: 1, SENIOR: 0 } as TicketQuantities,
        total: 52
      };
      
      const ticket = factory.createTicket(data);
      
      expect(ticket.date).toBe('2024-01-20');
      expect(ticket.total).toBe(52);
    });

    it('debería manejar valores undefined en cantidades', () => {
      const data = {
        date: '2024-01-20',
        quantities: { ADULT: undefined, CHILD: 2, SENIOR: 1 } as any,
        total: 39
      };
      
      const ticket = factory.createTicket(data);
      
      expect(ticket.quantities.ADULT).toBe(0);
      expect(ticket.quantities.CHILD).toBe(2);
      expect(ticket.quantities.SENIOR).toBe(1);
    });
  });
});