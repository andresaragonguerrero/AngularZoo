import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPurchase } from './activity-purchase';

describe('ActivityPurchase', () => {
  let component: ActivityPurchase;
  let fixture: ComponentFixture<ActivityPurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityPurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
