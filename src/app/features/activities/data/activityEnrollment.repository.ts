import { Injectable } from "@angular/core";

// Modelos
import { ActivityEnrollment } from "../models/activityEnrollment.interface";

@Injectable({
    providedIn: 'root'
})

export class ActivityEnrollementRepository {

    private readonly STORAGE_KEY = 'zoo_activity_enrollments';

    save(enrollment: ActivityEnrollment): void {
        const enrollments = this.findAll();
        enrollments.push(enrollment);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enrollments));
    }

    findAll(): ActivityEnrollment[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    findById(id: string): ActivityEnrollment | undefined {
        return this.findAll().find(e => e.id === id);
    }

    findByActivity(activityId: string): ActivityEnrollment[] {
        return this.findAll().filter(e => e.activityId === activityId);
    }

    findByUser(userId: string): ActivityEnrollment[] {
        return this.findAll().filter(e => e.userId === userId);
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}