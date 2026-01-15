import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkInfo } from './park-info';

describe('ParkInfo', () => {
  let component: ParkInfo;
  let fixture: ComponentFixture<ParkInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
