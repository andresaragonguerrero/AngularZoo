import { Component, inject, OnInit } from '@angular/core';

// Services
import { ActivityService } from '../../services/activity.service';

// Models
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-schedule-activities',
  imports: [],
  templateUrl: './schedule-activities.html',
  styleUrl: './schedule-activities.scss',
})
export class ScheduleActivities implements OnInit {

    private readonly activityService = inject(ActivityService);

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
}
