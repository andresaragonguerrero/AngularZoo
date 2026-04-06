import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Services
import { ActivityService } from '../../services/activity.service';

// Models
import { Activity } from '../../models/activity.interface';
import { LocalizedString } from '../../../../models/localize.interface';

@Component({
  selector: 'app-schedule-activities',
  imports: [
    TranslateModule,
  ],
  templateUrl: './schedule-activities.html',
  styleUrl: './schedule-activities.scss',
})
export class ScheduleActivities implements OnInit {

  private readonly activityService = inject(ActivityService);
  private readonly translate = inject(TranslateService);
  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  activities: Activity[] = [];

  ngOnInit(): void {
    this.loadActivities();
  }

  private loadActivities(): void {
    this.activityService.getActivitiesForCurrentSeason()
      .subscribe(activities => {
        this.activities = this.sortActivitiesByTime(activities);
      });
  }

  private sortActivitiesByTime(activities: Activity[]): Activity[] {
    return activities.sort((a, b) =>
      a.time.localeCompare(b.time)
    );
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}
