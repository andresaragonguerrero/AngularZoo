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

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private readonly zooDataService = inject(ZooDataService);
  private readonly courseEnrollmentRepository = inject(CourseEnrollmentRepository);

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
  }): { success: boolean; enrollment?: CourseEnrollment } {

    const enrollments = this.courseEnrollmentRepository.findByCourse(data.courseId);

    if (enrollments.length >= 30) {
      return { success: false };
    }

    const alreadyEnrolled = enrollments.some(e => e.userId === data.userId);

    if (alreadyEnrolled) {
      return { success: false };
    }

    const enrollment: CourseEnrollment = {
      id: crypto.randomUUID(),
      courseId: data.courseId,
      userId: data.userId,
      pricePaid: data.pricePaid,
      createdAt: new Date().toISOString()
    };

    this.courseEnrollmentRepository.save(enrollment);

    return {
      success: true,
      enrollment
    };
  }
}