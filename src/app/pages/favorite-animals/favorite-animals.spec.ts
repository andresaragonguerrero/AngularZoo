import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAnimals } from './favorite-animals';

describe('FavoriteAnimals', () => {
  let component: FavoriteAnimals;
  let fixture: ComponentFixture<FavoriteAnimals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteAnimals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteAnimals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
