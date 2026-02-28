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

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly courseRepository = inject(CourseRepository);
  private readonly enrollmentRepository = inject(EnrollmentRepository);
  private readonly courseFactory = inject(CourseFactory);

  private readonly STORAGE_SEED_KEY = 'zoo_courses_seeded';

  initSeed(courses: Array<{
    name: string;
    description: string;
    season: Season;
    startDate: string;
    capacity: number;
    price: number;
    isFreeForMembers: boolean;
  }>): void {

    const seeded = localStorage.getItem(this.STORAGE_SEED_KEY);

    if (seeded) return;

    const existing = this.courseRepository.findAll();

    if(!seeded && existing.length === 0) {

      courses.forEach(data => {
        const course = this.courseFactory.createCourse(data);
        this.courseRepository.save(course);
      });
    }

    localStorage.setItem(this.STORAGE_SEED_KEY, 'true');
  }

  getCoursesForCurrentSeason(): Course[] {

    const now = new Date();
    const month = now.getMonth() + 1;

    const season = this.getSeasonFromMonth(month);

    return this.courseRepository
      .findAll();
    // TODO: Reintroducir filtrado por temporada cuando el dominio esté estabilizado
    // .filter(course => course.season === season);
  }

  private getSeasonFromMonth(month: number): Season {

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

    const course = this.courseRepository.findById(data.courseId);

    if (!course) {
      return { success: false };
    }

    const enrollments = this.enrollmentRepository.findByCourse(course.id);

    if (enrollments.length >= course.capacity) {
      return { success: false };
    }

    const alreadyEnrolled = enrollments.some(e => e.userId === data.userId);

    if (alreadyEnrolled) {
      return { success: false };
    }

    const enrollment: Enrollment = {
      id: crypto.randomUUID(),
      courseId: course.id,
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

  getUserEnrollments(userId: string): Enrollment[] {
    return this.enrollmentRepository.findByUser(userId);
  }
}