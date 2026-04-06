import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPagination } from './animal-pagination';

describe('AnimalPagination', () => {
  let component: AnimalPagination;
  let fixture: ComponentFixture<AnimalPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
