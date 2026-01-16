import { TestBed } from '@angular/core/testing';
import { PriceCalculatorService } from './price-calculator.service';
import { MemberPriceStrategy } from '../strategy/member-price.strategy';
import { NonMemberPriceStrategy } from '../strategy/non-member-price.strategy';

describe('PriceCalculatorService', () => {
  let service: PriceCalculatorService;
  let memberStrategy: jasmine.SpyObj<MemberPriceStrategy>;
  let nonMemberStrategy: jasmine.SpyObj<NonMemberPriceStrategy>;

  beforeEach(() => {
    // Crear mocks de las estrategias
    memberStrategy = jasmine.createSpyObj('MemberPriceStrategy', ['calculateTotal', 'getUnitPrice']);
    nonMemberStrategy = jasmine.createSpyObj('NonMemberPriceStrategy', ['calculateTotal', 'getUnitPrice']);

    // Configurar valores por defecto para los mocks
    memberStrategy.calculateTotal.and.returnValue(25);
    memberStrategy.getUnitPrice.withArgs('ADULT').and.returnValue(10);
    memberStrategy.getUnitPrice.withArgs('CHILD').and.returnValue(6);
    memberStrategy.getUnitPrice.withArgs('SENIOR').and.returnValue(7.5);

    nonMemberStrategy.calculateTotal.and.returnValue(50);
    nonMemberStrategy.getUnitPrice.withArgs('ADULT').and.returnValue(20);
    nonMemberStrategy.getUnitPrice.withArgs('CHILD').and.returnValue(12);
    nonMemberStrategy.getUnitPrice.withArgs('SENIOR').and.returnValue(15);

    TestBed.configureTestingModule({
      providers: [
        PriceCalculatorService,
        { provide: MemberPriceStrategy, useValue: memberStrategy },
        { provide: NonMemberPriceStrategy, useValue: nonMemberStrategy }
      ]
    });

    service = TestBed.inject(PriceCalculatorService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Estado inicial', () => {
    it('debería tener cantidades en 0', () => {
      expect(service.quantities()).toEqual({ ADULT: 0, CHILD: 0, SENIOR: 0 });
    });

    it('debería no ser socio por defecto', () => {
      expect(service.isMember()).toBeFalse();
    });

    it('debería usar estrategia no socio por defecto', () => {
      // Al calcular total, debería usar nonMemberStrategy
      service.total();
      expect(nonMemberStrategy.calculateTotal).toHaveBeenCalled();
    });
  });

  describe('updateQuantity', () => {
    it('debería actualizar cantidad de adultos', () => {
      service.updateQuantity('ADULT', 3);
      expect(service.quantities().ADULT).toBe(3);
    });

    it('debería actualizar cantidad de niños', () => {
      service.updateQuantity('CHILD', 2);
      expect(service.quantities().CHILD).toBe(2);
    });

    it('debería actualizar cantidad de seniors', () => {
      service.updateQuantity('SENIOR', 1);
      expect(service.quantities().SENIOR).toBe(1);
    });

    it('no debería aceptar valores negativos', () => {
      service.updateQuantity('ADULT', -5);
      expect(service.quantities().ADULT).toBe(0);
    });
  });

  describe('updateQuantities', () => {
    it('debería actualizar todas las cantidades', () => {
      const nuevasCantidades = { ADULT: 2, CHILD: 3, SENIOR: 1 };
      service.updateQuantities(nuevasCantidades);
      
      expect(service.quantities()).toEqual(nuevasCantidades);
    });

    it('debería manejar valores undefined como 0', () => {
      const cantidades = { ADULT: 2, CHILD: undefined as any, SENIOR: 1 };
      service.updateQuantities(cantidades);
      
      expect(service.quantities().CHILD).toBe(0);
    });
  });

  describe('setMemberStatus', () => {
    it('debería cambiar a socio', () => {
      service.setMemberStatus(true);
      expect(service.isMember()).toBeTrue();
    });

    it('debería cambiar a no socio', () => {
      service.setMemberStatus(true); // Primero a socio
      service.setMemberStatus(false); // Luego a no socio
      expect(service.isMember()).toBeFalse();
    });

    it('debería cambiar la estrategia de cálculo', () => {
      // Inicialmente usa nonMemberStrategy
      service.total();
      expect(nonMemberStrategy.calculateTotal).toHaveBeenCalled();

      // Cambia a socio
      service.setMemberStatus(true);
      service.total(); // Forzar recálculo
      expect(memberStrategy.calculateTotal).toHaveBeenCalled();
    });
  });

  describe('getTotalTickets', () => {
    it('debería sumar todas las entradas', () => {
      service.updateQuantities({ ADULT: 2, CHILD: 1, SENIOR: 1 });
      expect(service.getTotalTickets()).toBe(4);
    });

    it('debería retornar 0 si no hay entradas', () => {
      expect(service.getTotalTickets()).toBe(0);
    });
  });

  describe('reset', () => {
    it('debería reiniciar todas las cantidades a 0', () => {
      service.updateQuantities({ ADULT: 5, CHILD: 3, SENIOR: 2 });
      service.reset();
      
      expect(service.quantities()).toEqual({ ADULT: 0, CHILD: 0, SENIOR: 0 });
    });
  });

  describe('Signals reactivas', () => {
    it('total debería actualizarse al cambiar cantidades', () => {
      // Configurar mock para retornar valor basado en cantidades
      nonMemberStrategy.calculateTotal.and.callFake((q: any) => {
        return q.ADULT * 20 + q.CHILD * 12 + q.SENIOR * 15;
      });

      service.updateQuantities({ ADULT: 2, CHILD: 0, SENIOR: 0 });
      expect(service.total()).toBe(40); // 2 * 20 = 40
    });

    it('unitPrices debería cambiar al cambiar estado de socio', () => {
      // Como no socio
      expect(service.unitPrices().ADULT).toBe(20);
      
      // Como socio
      service.setMemberStatus(true);
      expect(service.unitPrices().ADULT).toBe(10);
    });
  });
});