import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityComponent } from './activities';
import { of } from 'rxjs';
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


const mockActivityService = {
  getActivitiesForCurrentSeason: jasmine.createSpy().and.returnValue(of([]))
};

const mockAuthService = {
  currentUser: jasmine.createSpy().and.returnValue(null)
};

const mockRouter = {
  navigate: jasmine.createSpy()
};

const mockTranslateService = {
  currentLang: 'es',
  onLangChange: of({ lang: 'es' })
};

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityComponent],
      providers: [
        { provide: ActivityService, useValue: mockActivityService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: TranslateService, useValue: mockTranslateService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});