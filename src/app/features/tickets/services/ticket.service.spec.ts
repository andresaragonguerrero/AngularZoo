import { TestBed } from '@angular/core/testing';
import { TicketService } from './ticket.service';
import { TicketFactory } from '../factories/ticket.factory';
import { TicketRepository } from '../data/ticket.repository';
import { Ticket } from '../models/ticket.interface';
import { AvailabilityService } from '../../../core/availability/services/availability.service';
import { PriceCalculatorService } from '../../../core/pricing/services/price-calculator.service';

describe('TicketService', () => {
  let service: TicketService;
  let factoryMock: jasmine.SpyObj<TicketFactory>;
  let repositoryMock: jasmine.SpyObj<TicketRepository>;

  let availabilityMock: jasmine.SpyObj<AvailabilityService>;
  let priceCalculatorMock: jasmine.SpyObj<PriceCalculatorService>;

  beforeEach(() => {
    availabilityMock = jasmine.createSpyObj('AvailabilityService', [
      'checkAvailability',
      'reserve'
    ]);

    priceCalculatorMock = jasmine.createSpyObj('PriceCalculatorService', [
      'setMemberStatus',
      'updateQuantities',
      'total'
    ]);

    // Crear mocks
    factoryMock = jasmine.createSpyObj('TicketFactory', ['createTicket']);
    repositoryMock = jasmine.createSpyObj('TicketRepository', [
      'save', 'findAll', 'delete', 'clear'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TicketService,
        { provide: TicketFactory, useValue: factoryMock },
        { provide: TicketRepository, useValue: repositoryMock },
        { provide: AvailabilityService, useValue: availabilityMock },
        { provide: PriceCalculatorService, useValue: priceCalculatorMock }
      ]
    });

    service = TestBed.inject(TicketService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('createAndSaveTicket', () => {
    it('debería crear y guardar un ticket', () => {
      const mockTicket: Ticket = {
        id: 'test-123',
        date: '2024-01-20',
        hour: '10:00',
        quantities: { ADULT: 2, CHILD: 1, SENIOR: 0 },
        total: 52
      };

      const inputData = {
        date: '2024-01-20',
        hour: '10:00',
        quantities: { ADULT: 2, CHILD: 1, SENIOR: 0 },
        total: 52
      };

      // Configurar mock
      factoryMock.createTicket.and.returnValue(mockTicket);

      // Ejecutar
      const result = service.createAndSaveTicket(inputData);

      // Verificar
      expect(factoryMock.createTicket).toHaveBeenCalledWith(inputData);
      expect(repositoryMock.save).toHaveBeenCalledWith(mockTicket);
      expect(result).toBe(mockTicket);
    });

    it('debería retornar el ticket creado', () => {
      const mockTicket: Ticket = {
        id: 'test-456',
        date: '2024-01-21',
        hour: '11:00',
        quantities: { ADULT: 1, CHILD: 0, SENIOR: 1 },
        total: 35
      };

      factoryMock.createTicket.and.returnValue(mockTicket);

      const result = service.createAndSaveTicket({
        date: '2024-01-21',
        hour: '11:00',
        quantities: { ADULT: 1, CHILD: 0, SENIOR: 1 },
        total: 35
      });

      expect(result).toBe(mockTicket);
    });
  });

  describe('getAllTickets', () => {
    it('debería retornar todos los tickets del repositorio', () => {
      const mockTickets: Ticket[] = [
        {
          id: 'ticket-1',
          date: '2024-01-20',
          hour: '10:00',
          quantities: { ADULT: 2, CHILD: 0, SENIOR: 0 },
          total: 40
        },
        {
          id: 'ticket-2',
          date: '2024-01-21',
          hour: '11:00',
          quantities: { ADULT: 1, CHILD: 1, SENIOR: 0 },
          total: 32
        }
      ];

      repositoryMock.findAll.and.returnValue(mockTickets);

      const result = service.getAllTickets();

      expect(repositoryMock.findAll).toHaveBeenCalled();
      expect(result).toBe(mockTickets);
    });

    it('debería retornar array vacío si no hay tickets', () => {
      repositoryMock.findAll.and.returnValue([]);

      const result = service.getAllTickets();

      expect(result).toEqual([]);
    });
  });

  describe('deleteTicket', () => {
    it('debería eliminar ticket por ID', () => {
      const ticketId = 'ticket-to-delete';

      service.deleteTicket(ticketId);

      expect(repositoryMock.delete).toHaveBeenCalledWith(ticketId);
    });

    it('debería llamar al repositorio con el ID correcto', () => {
      const ticketId = 'test-id-123';

      service.deleteTicket(ticketId);

      expect(repositoryMock.delete).toHaveBeenCalledWith('test-id-123');
    });
  });

  describe('clearAllTickets', () => {
    it('debería limpiar todos los tickets', () => {
      service.clearAllTickets();

      expect(repositoryMock.clear).toHaveBeenCalled();
    });

    it('debería llamar al método clear del repositorio', () => {
      service.clearAllTickets();

      expect(repositoryMock.clear.calls.count()).toBe(1);
    });
  });
});