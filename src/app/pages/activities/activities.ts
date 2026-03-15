import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// Services
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../services/auth.service';

// Models
import { Activity } from '../../models/activity.interface';

@Component({
  selector: 'app-activities',
  imports: [
    RouterModule,
  ],
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})

export class ActivityComponent implements OnInit {
  
  private readonly activityService = inject(ActivityService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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
        this.activities = activities;
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
}
