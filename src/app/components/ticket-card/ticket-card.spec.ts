import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCard } from './ticket-card';
import { PriceCalculatorService } from '../../services/price-calculator.service';
import { TicketService } from '../../services/ticket.service';

const mockPriceCalculatorService = {
  updateQuantity: jasmine.createSpy('updateQuantity'),
  total: jasmine.createSpy('total').and.returnValue(50),
  getTotalTickets: jasmine.createSpy('getTotalTickets').and.returnValue(3),
  quantities: jasmine.createSpy('quantities').and.returnValue({
    SENIOR: 1,
    ADULT: 1,
    CHILD: 1
  }),
  reset: jasmine.createSpy('reset') // añadido
};

//añadido
const mockTicketService = {
  createAndSaveTicket: jasmine.createSpy('createAndSaveTicket').and.returnValue({
    id: 'test-id-123',
    date: '2024-01-20',
    quantities: { ADULT: 1, CHILD: 1, SENIOR: 1 },
    total: 50
  })
};
// fin del añadido

describe('TicketCardComponent', () => {
  let component: TicketCard;
  let fixture: ComponentFixture<TicketCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCard],
      providers: [
        {
          provide: PriceCalculatorService,
          useValue: mockPriceCalculatorService
        },
        // añadido
        {
          provide: TicketService,
          useValue: mockTicketService
        },
        // fin del añadido
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Limpiar spies después de cada test
  afterEach(() => {
    // Resetear todos los spies manualmente
    mockPriceCalculatorService.updateQuantity.calls.reset();
    mockPriceCalculatorService.total.calls.reset();
    mockPriceCalculatorService.getTotalTickets.calls.reset();
    mockPriceCalculatorService.quantities.calls.reset();
    mockPriceCalculatorService.reset.calls.reset(); // añadido
    mockTicketService.createAndSaveTicket.calls.reset(); // añadido
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('onSeniorChange', () => {
    it('debería actualizar seniorQuantity y llamar al servicio', () => {
      const event = { target: { value: '2' } } as unknown as Event;

      component.onSeniorChange(event);

      expect(component.seniorQuantity).toBe(2);
      expect(mockPriceCalculatorService.updateQuantity).toHaveBeenCalledWith('SENIOR', 2);
    });

    it('debería convertir texto a 0', () => {
      const event = { target: { value: 'abc' } } as unknown as Event;

      component.onSeniorChange(event);

      expect(component.seniorQuantity).toBe(0);
      expect(mockPriceCalculatorService.updateQuantity).toHaveBeenCalledWith('SENIOR', 0);
    });
  });

  describe('onAdultChange', () => {
    it('debería actualizar adultQuantity', () => {
      const event = { target: { value: '3' } } as unknown as Event;

      component.onAdultChange(event);

      expect(component.adultQuantity).toBe(3);
      expect(mockPriceCalculatorService.updateQuantity).toHaveBeenCalledWith('ADULT', 3);
    });
  });

  describe('onChildChange', () => {
    it('debería actualizar childQuantity', () => {
      const event = { target: { value: '1' } } as unknown as Event;

      component.onChildChange(event);

      expect(component.childQuantity).toBe(1);
      expect(mockPriceCalculatorService.updateQuantity).toHaveBeenCalledWith('CHILD', 1);
    });
  });

  describe('onBuyClick', () => {
    it('debería crear ticket y resetear formulario', () => {
      const consoleSpy = spyOn(console, 'log');
      component.seniorQuantity = 1;
      component.adultQuantity = 2;
      component.childQuantity = 1;

      component.onBuyClick();

      // Verifica que se llamaron los métodos del servicio
      expect(mockPriceCalculatorService.total).toHaveBeenCalled();
      expect(mockPriceCalculatorService.getTotalTickets).toHaveBeenCalled();

      // Verifica que se creó el ticket
      expect(mockTicketService.createAndSaveTicket).toHaveBeenCalledWith({
        date: jasmine.any(String), // Fecha en formato YYYY-MM-DD
        quantities: { SENIOR: 1, ADULT: 1, CHILD: 1 },
        total: 50
      });

      // Verifica que se reseteó
      expect(mockPriceCalculatorService.reset).toHaveBeenCalled();

      // Verifica que se imprimió en consola
      expect(consoleSpy).toHaveBeenCalled();

      // Verifica que se imprimió en consola (cualquier llamada)
      expect(consoleSpy).toHaveBeenCalled();

      // Busca "RESUMEN DE COMPRA" en CUALQUIER llamada a console.log
      const allConsoleCalls = consoleSpy.calls.all();
      const hasResumen = allConsoleCalls.some(call =>
        call.args[0]?.toString().includes('RESUMEN DE COMPRA')
      );

      expect(hasResumen).toBeTrue();
    });

    it('debería resetear cantidades locales a 0', () => {
      // Configurar cantidades iniciales
      component.seniorQuantity = 2;
      component.adultQuantity = 3;
      component.childQuantity = 1;

      component.onBuyClick();

      // Verificar que se resetean
      expect(component.seniorQuantity).toBe(0);
      expect(component.adultQuantity).toBe(0);
      expect(component.childQuantity).toBe(0);
    });
  });
});