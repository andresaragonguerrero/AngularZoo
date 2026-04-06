import { Injectable, inject } from '@angular/core';

// Modelos
import { Course } from '../models/course.interface';
import { CourseEnrollment } from '../models/courseEnrollment.interface';

// Repositorio
import { CourseEnrollmentRepository } from '../data/courseEnrollment.repository';

// Strategy
import { CourseEnrollmentStrategy, EnrollmentResult } from './course-enrollment.strategy';

@Injectable({
    providedIn: 'root',
})
export class DefaultEnrollmentStrategy implements CourseEnrollmentStrategy {

    private readonly courseEnrollmentRepository = inject(CourseEnrollmentRepository);

    enroll(data: {
        course: Course;
        userId: string;
        pricePaid: number;
    }): EnrollmentResult {

        const { course, userId, pricePaid } = data;

        if (!course) {
            return { success: false, reason: 'COURSE_NOT_FOUND' };
        }

        // Validar que el curso no haya empezado
        if (new Date(course.startDate) < new Date()) {
            return { success: false, reason: 'COURSE_ALREADY_STARTED' };
        }

        // Validar capacidad
        const enrollments = this.courseEnrollmentRepository.findByCourse(course.id);
        if (enrollments.length >= course.capacity) {
            return { success: false, reason: 'COURSE_FULL' };
        }

        // Validar inscripción duplicada
        if (enrollments.some(e => e.userId === userId)) {
            return { success: false, reason: 'ALREADY_ENROLLED' };
        }

        // Crear inscripción
        const enrollment: CourseEnrollment = {
            id: crypto.randomUUID(),
            courseId: course.id,
            userId,
            pricePaid,
            createdAt: new Date().toISOString(),
        };

        this.courseEnrollmentRepository.save(enrollment);

        return { success: true, enrollment };
    }
}