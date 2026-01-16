import { TestBed } from '@angular/core/testing';

import { TicketRepository } from './ticket.repository.js';

describe('TicketRepository', () => {
  let service: TicketRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
