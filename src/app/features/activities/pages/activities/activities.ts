import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// servicios
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../../auth/services/auth.service';

// modelos
import { Activity } from '../../models/activity.interface';
import { LocalizedString } from '../../../../models/localize.interface';

// pipes
import { SeasonPipe } from '../../../../shared/pipes/season.pipe';

@Component({
  selector: 'app-activities',
  imports: [
    RouterModule,
    SeasonPipe,
    TranslateModule,
  ],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})

export class ActivityComponent implements OnInit {

  @Input() limit?: number;
  @Input() variant: 'default' | 'compact' = 'default';

  private readonly activityService = inject(ActivityService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  activities: Activity[] = [];

  isMember = computed(() =>
    this.authService.currentUser()?.isMember ?? false
  );

  ngOnInit(): void {
    this.loadActivities();
  }

  private loadActivities(): void {
    this.activityService.getActivitiesForCurrentSeason()
      .subscribe(activities => {

        this.activities = this.limit
          ? activities.slice(0, this.limit)
          : activities;

      });
  }

  enroll(activityId: string): void {

    const mode = this.isMember() ? 'member' : 'guest';

    this.router.navigate(['/activity-purchase'], {
      queryParams: {
        activityId,
        mode
      }
    });
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}
