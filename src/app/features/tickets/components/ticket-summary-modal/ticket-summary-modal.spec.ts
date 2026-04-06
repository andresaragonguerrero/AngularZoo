import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSummaryModal } from './ticket-summary-modal';

describe('TicketSummaryModal', () => {
  let component: TicketSummaryModal;
  let fixture: ComponentFixture<TicketSummaryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSummaryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSummaryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
