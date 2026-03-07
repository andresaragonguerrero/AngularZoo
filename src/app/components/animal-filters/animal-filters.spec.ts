import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFilters } from './animal-filters';

describe('AnimalFilters', () => {
  let component: AnimalFilters;
  let fixture: ComponentFixture<AnimalFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
