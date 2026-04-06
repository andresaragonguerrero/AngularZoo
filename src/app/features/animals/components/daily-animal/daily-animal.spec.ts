import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAnimal } from './daily-animal';

describe('DailyAnimal', () => {
  let component: DailyAnimal;
  let fixture: ComponentFixture<DailyAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyAnimal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAnimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
