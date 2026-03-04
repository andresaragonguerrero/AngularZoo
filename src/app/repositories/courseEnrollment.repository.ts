import { Injectable } from '@angular/core';

// Modelos
import { CourseEnrollment } from '../models/courseEnrollment.model';

@Injectable({
    providedIn: 'root'
})
export class CourseEnrollmentRepository {

    private readonly STORAGE_KEY = 'zoo_course_enrollments';

    save(enrollment: CourseEnrollment): void {
        const enrollments = this.findAll();
        enrollments.push(enrollment);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrollments));
    }

    findAll(): CourseEnrollment[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    findById(id: string): CourseEnrollment | undefined {
        return this.findAll().find(e => e.id === id);
    }

    findByCourse(courseId: string): CourseEnrollment[] {
        return this.findAll().filter(e => e.courseId === courseId);
    }

    findByUser(userId: string): CourseEnrollment[] {
        return this.findAll().filter(e => e.userId === userId);
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}