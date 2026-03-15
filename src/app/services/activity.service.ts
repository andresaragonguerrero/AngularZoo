import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Servicios
import { ZooDataService } from './zoo-data.service';

// Repositorios
import { ActivityEnrollementRepository } from '../repositories/activityEnrollment.repository';

// Modelos
import { Activity } from '../models/activity.interface';
import { ActivityEnrollment } from '../models/activityEnrollment.interface';
import { Season } from '../models/season.enum';

// Estrategias
import { DefaultActivityEnrollmentStrategy } from '../strategy/default-activity-enrollment.strategy';
import { ActivityEnrollmentResult } from '../strategy/activity-enrollment.strategy';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  private readonly zooDataService = inject(ZooDataService);
  private readonly activityEnrollmentRepository = inject(ActivityEnrollementRepository);
  private readonly enrollmentStrategy = inject(DefaultActivityEnrollmentStrategy);

  getActivitiesForCurrentSeason(): Observable<Activity[]> {

    return this.zooDataService.getZooData().pipe(
      map(data => {
        const season = this.getCurrentSeason();
        return data.activities.filter(
          (activity: Activity) => activity.season === season
        );
      })
    );
  }

  private getCurrentSeason(): Season {
    const month = new Date().getMonth() + 1;

    if (month >= 3 && month <= 5) return Season.SPRING;
    if (month >= 6 && month <= 8) return Season.SUMMER;
    if (month >= 9 && month <= 11) return Season.AUTUMN;

    return Season.WINTER;
  }

  enrollActivity(params: {
    activity: Activity;
    userId: string;
    pricePaid: number;
  }): ActivityEnrollmentResult {
    return this.enrollmentStrategy.enroll(params);
  }

  getEnrollmentsByActivity(activityId: string): ActivityEnrollment[] {
    return this.activityEnrollmentRepository.findByActivity(activityId);
  }

  getEnrollmentsByUser(userId: string): ActivityEnrollment[] {
    return this.activityEnrollmentRepository.findByUser(userId);
  }
}
