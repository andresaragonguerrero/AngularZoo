import { TestBed } from '@angular/core/testing';

import { FavoriteAnimalsService } from './favorite-animals.service';

describe('FavoriteAnimalsService', () => {
  let service: FavoriteAnimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteAnimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
