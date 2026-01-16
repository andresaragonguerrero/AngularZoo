import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosystemsComponent } from './ecosystems';

describe('Ecosystems', () => {
  let component: EcosystemsComponent;
  let fixture: ComponentFixture<EcosystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosystemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcosystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
