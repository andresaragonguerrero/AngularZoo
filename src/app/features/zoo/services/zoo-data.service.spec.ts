import { TestBed } from '@angular/core/testing';

import { ZooDataService } from './zoo-data.service';

describe('ZooDataService', () => {
  let service: ZooDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZooDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
