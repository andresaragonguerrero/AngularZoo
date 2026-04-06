import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActivities } from './schedule-activities';

describe('ScheduleActivities', () => {
  let component: ScheduleActivities;
  let fixture: ComponentFixture<ScheduleActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleActivities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleActivities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
