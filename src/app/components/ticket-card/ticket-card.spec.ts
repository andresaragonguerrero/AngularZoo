import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCard } from './ticket-card';
import { PriceCalculatorService } from '../../services/price-calculator.service';
import { TicketService } from '../../services/ticket.service';

import { ReactiveFormsModule } from '@angular/forms';

describe('TicketCardComponent', () => {
  let component: TicketCard;
  let fixture: ComponentFixture<TicketCard>;
  let mockPriceCalculator: jasmine.SpyObj<PriceCalculatorService>;
  let mockTicketService: jasmine.SpyObj<TicketService>;

  const mockTicket = {
    id: '123',
    date: new Date().toISOString().split('T')[0],
    quantities: { ADULT: 1, CHILD: 0, SENIOR: 2 },
    total: 45
  };

  beforeEach(async () => {
    mockPriceCalculator = jasmine.createSpyObj('PriceCalculatorService', [
      'updateQuantity',
      'quantities',
      'total',
      'reset'
    ]);

    mockTicketService = jasmine.createSpyObj('TicketService', [
      'createAndSaveTicket'
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TicketCard]
    })
      .overrideProvider(PriceCalculatorService, { useValue: mockPriceCalculator })
      .overrideProvider(TicketService, { useValue: mockTicketService })
      .compileComponents();

    fixture = TestBed.createComponent(TicketCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.ticketForm.value).toEqual({
      senior: 0,
      adult: 0,
      child: 0
    });
  });

  it('should be invalid with negative values', () => {
    component.ticketForm.patchValue({ senior: -1 });
    expect(component.ticketForm.invalid).toBeTrue();
  });

  it('should be invalid when total tickets is 0', () => {
    component.ticketForm.patchValue({ senior: 0, adult: 0, child: 0 });
    expect(component.ticketForm.invalid).toBeTrue();
  });

  it('should be valid with at least 1 ticket', () => {
    component.ticketForm.patchValue({ senior: 1 });
    expect(component.ticketForm.valid).toBeTrue();
  });

  it('should call services when buying with valid form', () => {
    // Arrange
    component.ticketForm.patchValue({ senior: 2, adult: 1, child: 0 });
    mockPriceCalculator.quantities.and.returnValue({ ADULT: 1, CHILD: 0, SENIOR: 2 });
    mockPriceCalculator.total.and.returnValue(45);
    mockTicketService.createAndSaveTicket.and.returnValue(mockTicket);

    // Act
    component.onBuyClick();

    // Assert
    expect(mockPriceCalculator.updateQuantity).toHaveBeenCalledWith('SENIOR', 2);
    expect(mockPriceCalculator.updateQuantity).toHaveBeenCalledWith('ADULT', 1);
    expect(mockPriceCalculator.updateQuantity).toHaveBeenCalledWith('CHILD', 0);
    expect(mockTicketService.createAndSaveTicket).toHaveBeenCalled();
    expect(mockPriceCalculator.reset).toHaveBeenCalled();
  });

  it('should not call services when form is invalid', () => {
    // Arrange
    component.ticketForm.patchValue({ senior: -1 });

    // Act
    component.onBuyClick();

    // Assert
    expect(mockPriceCalculator.updateQuantity).not.toHaveBeenCalled();
    expect(mockTicketService.createAndSaveTicket).not.toHaveBeenCalled();
  });

  it('should reset form after successful purchase', () => {
    // Arrange
    component.ticketForm.patchValue({ senior: 1 });
    mockPriceCalculator.quantities.and.returnValue({ ADULT: 0, CHILD: 0, SENIOR: 1 });
    mockPriceCalculator.total.and.returnValue(15);
    mockTicketService.createAndSaveTicket.and.returnValue(mockTicket);

    // Act
    component.onBuyClick();

    // Assert
    expect(component.ticketForm.value).toEqual({ senior: 0, adult: 0, child: 0 });
  });
});