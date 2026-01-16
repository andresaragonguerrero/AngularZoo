import { TestBed } from '@angular/core/testing';

import { PriceCalculatorServiceTs } from './price-calculator.service.ts';

describe('PriceCalculatorServiceTs', () => {
  let service: PriceCalculatorServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculatorServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
