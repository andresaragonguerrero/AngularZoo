import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ecosystems } from './ecosystems';

describe('Ecosystems', () => {
  let component: Ecosystems;
  let fixture: ComponentFixture<Ecosystems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ecosystems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ecosystems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
