import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// Servicios
import { ZooDataService } from './zoo-data.service';

// Repositorios
import { ActivityEnrollementRepository } from '../repositories/activityEnrollment.repository';

// Modelos
import { Activity } from '../models/activity';
import { ActivityEnrollment } from '../models/activityEnrollment.model';
import { Season } from '../models/season.enum';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  private readonly zooDataService = inject(ZooDataService);
  private readonly activityEnrollmentRepository = inject(ActivityEnrollementRepository);

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

  enrollActivity(data: {
    activityId: string;
    userId: string;
    pricePaid: number;
  }): { success: boolean; enrollment?: ActivityEnrollment } {

    const enrollments = this.activityEnrollmentRepository.findByActivity(data.activityId);

    if (enrollments.length >= 30) {
      return { success: false };
    }

    const alreadyEnrolled = enrollments.some(e => e.userId === data.userId);

    if (alreadyEnrolled) {
      return { success: false };
    }

    const enrollment: ActivityEnrollment = {
      id: crypto.randomUUID(),
      activityId: data.activityId,
      userId: data.userId,
      pricePaid: data.pricePaid,
      createdAt: new Date().toISOString()
    };

    this.activityEnrollmentRepository.save(enrollment);

    return {
      success: true,
      enrollment
    };
  }
}
