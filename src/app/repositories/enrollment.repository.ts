import { Injectable } from '@angular/core';

// Modelos
import { Enrollment } from '../models/enrollment.model';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentRepository {

    private readonly STORAGE_KEY = 'zoo_enrollments';

    save(enrollment: Enrollment): void {
        const enrollments = this.findAll();
        enrollments.push(enrollment);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrollments));
    }

    findAll(): Enrollment[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    findById(id: string): Enrollment | undefined {
        return this.findAll().find(e => e.id === id);
    }

    findByCourse(courseId: string): Enrollment[] {
        return this.findAll().filter(e => e.courseId === courseId);
    }

    findByUser(userId: string): Enrollment[] {
        return this.findAll().filter(e => e.userId === userId);
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}