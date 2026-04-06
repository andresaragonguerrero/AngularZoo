import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePurchase } from './course-purchase';

describe('CoursePurchase', () => {
  let component: CoursePurchase;
  let fixture: ComponentFixture<CoursePurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
