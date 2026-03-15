import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

// Servicios
import { ZooDataService } from './zoo-data.service';

// Repositorios
import { CourseEnrollmentRepository } from '../repositories/courseEnrollment.repository';

// Modelos
import { Course } from '../models/course.interface';
import { CourseEnrollment } from '../models/courseEnrollment.interface';
import { Season } from '../models/season.enum';

// Estrategias
import { DefaultEnrollmentStrategy } from '../strategy/default-enrollment.strategy';
import { EnrollmentResult } from '../strategy/course-enrollment.strategy';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private readonly zooDataService = inject(ZooDataService);
  private readonly courseEnrollmentRepository = inject(CourseEnrollmentRepository);
  private readonly enrollmentStrategy = inject(DefaultEnrollmentStrategy);

  getCoursesForCurrentSeason(): Observable<Course[]> {

    return this.zooDataService.getZooData().pipe(
      map(data => {
        const season = this.getCurrentSeason();
        return data.courses.filter(
          (course: Course) => course.season === season
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

  enrollCourse(params: {
    course: Course;
    userId: string;
    pricePaid: number;
  }): EnrollmentResult {
    return this.enrollmentStrategy.enroll(params);
  }

  getEnrollmentsByCourse(courseId: string): CourseEnrollment[] {
    return this.courseEnrollmentRepository.findByCourse(courseId);
  }

  getEnrollmentsByUser(userId: string): CourseEnrollment[] {
    return this.courseEnrollmentRepository.findByUser(userId);
  }
}