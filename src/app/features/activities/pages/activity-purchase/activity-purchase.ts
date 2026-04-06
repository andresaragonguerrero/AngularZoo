import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Servicios
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../../auth/services/auth.service';

// Modelos
import { Activity } from '../../models/activity.interface';
import { LocalizedString } from '../../../../models/localize.interface';

@Component({
  selector: 'app-activity-purchase',
  imports: [
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './activity-purchase.html',
  styleUrl: './activity-purchase.scss',
})
export class ActivityPurchase implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly activityService = inject(ActivityService);
  private readonly authService = inject(AuthService);
  private readonly translate = inject(TranslateService);

  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  activities: Activity[] = [];
  selectedActivity?: Activity;
  isMember = false;

  ngOnInit(): void {

    this.isMember = this.authService.currentUser()?.isMember ?? false;

    const activityId = this.route.snapshot.queryParamMap.get('activityId');

    if (!activityId) {
      this.router.navigate(['/activities']);
      return;
    }

    this.activityService
      .getActivitiesForCurrentSeason()
      .subscribe(activities => {

        this.activities = activities;

        if (activityId) {
          this.selectedActivity = activities.find(a => a.id === activityId);
        }

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
      alert('Debes iniciar sesión para inscribirte en una actividad');
      this.router.navigate(['/login']);
      return;
    }

    const pricePaid =
      this.isMember && activity.isFreeForMembers
        ? 0
        : activity.price;

    const result = this.activityService.enrollActivity({
      activity,
      userId: user.id,
      pricePaid
    });

    if (!result.success) {

      switch (result.reason) {
        case 'ACTIVITY_FULL':
          alert('La actividad está completa');
          break;
        case 'ALREADY_ENROLLED':
          alert('Ya estás inscrito en esta actividad');
          break;
        case 'ACTIVITY_NOT_FOUND':
          alert('La actividad no existe');
          break;
        default:
          alert('No se pudo completar la inscripción');
      }

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

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }

  getTranslatedDays(days: string[]): string {
    return days.map(day => this.translate.instant('ACTIVITY_PURCHASE.DAYS.' + day)).join(', ');
  }
}
