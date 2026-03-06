import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Servicios
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../services/auth.service';

// Modelos
import { Activity } from '../../models/activity.interface';

@Component({
  selector: 'app-activity-purchase',
  imports: [
    RouterModule,
  ],
  templateUrl: './activity-purchase.html',
  styleUrl: './activity-purchase.scss',
})
export class ActivityPurchase implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly activityService = inject(ActivityService);
  private readonly authService = inject(AuthService);

  activities: Activity[] = [];
  selectedActivity?: Activity;
  isMember = false;

  ngOnInit(): void {

    this.isMember = this.authService.currentUser()?.isMember ?? false;

    this.activityService.getActivitiesForCurrentSeason()
      .subscribe(activities => {
        this.activities = activities;

        this.route.queryParams.subscribe(params => {
          const courseId = params['courseId'];
          if (courseId) {
            this.selectedActivity = this.activities
              .find(c => c.id === courseId);
          }
        });
      });
  }

  getPrice(activity: Activity): number {

    if (this.isMember && activity.isFreeForMembers) {
      return 0;
    }

    return activity.price;
  }

  enroll(activity: Activity): void {

    const user = this.authService.currentUser();

    if (!user) {
      alert('Debes iniciar sesión para inscribirte en un curso');
      this.router.navigate(['/login']);
      return;
    }

    const pricePaid =
      this.isMember && activity.isFreeForMembers
        ? 0
        : activity.price;

    const result = this.activityService.enrollActivity({
      activityId: activity.id,
      userId: user.id,
      pricePaid
    });

    if (!result.success) {
      alert('No se pudo completar la inscripción');
      return;
    }

    console.log('Inscripción realizada:', result.enrollment);

    this.router.navigate(['/activities']);
  }

  goToMembership(): void {
    this.router.navigate(['/register'], {
      queryParams: { becomeMember: true }
    });
  }
}
