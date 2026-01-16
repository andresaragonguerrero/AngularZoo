import { TestBed } from '@angular/core/testing';

import { TicketFactory } from './ticket.factory.js';

describe('TicketFactory', () => {
  let service: TicketFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
