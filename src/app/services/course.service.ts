import { Injectable, inject } from '@angular/core';

// Repositorios
import { CourseRepository } from '../repositories/course.repository';
import { EnrollmentRepository } from '../repositories/enrollment.repository';

// Factorías
import { CourseFactory } from '../factories/course.factory';

// Modelos
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Season } from '../models/season.enum';
import { ZooDataService } from './zoo-data.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private readonly zooDataService = inject(ZooDataService);
  private readonly enrollmentRepository = inject(EnrollmentRepository);

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

  enrollCourse(data: {
    courseId: string;
    userId: string;
    pricePaid: number;
  }): { success: boolean; enrollment?: Enrollment } {

    const enrollments = this.enrollmentRepository.findByCourse(data.courseId);

    if (enrollments.length >= 30) {
      return { success: false };
    }

    const alreadyEnrolled = enrollments.some(e => e.userId === data.userId);

    if (alreadyEnrolled) {
      return { success: false };
    }

    const enrollment: Enrollment = {
      id: crypto.randomUUID(),
      courseId: data.courseId,
      userId: data.userId,
      pricePaid: data.pricePaid,
      createdAt: new Date().toISOString()
    };

    this.enrollmentRepository.save(enrollment);

    return {
      success: true,
      enrollment
    };
  }
}