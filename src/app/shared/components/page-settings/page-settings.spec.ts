import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSettings } from './page-settings';

describe('PageSettings', () => {
  let component: PageSettings;
  let fixture: ComponentFixture<PageSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
