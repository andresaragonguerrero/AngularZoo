import { Injectable, inject } from '@angular/core';

// Modelos
import { Activity } from '../models/activity.interface';
import { ActivityEnrollment } from '../models/activityEnrollment.interface';

// Repositorio
import { ActivityEnrollementRepository } from '../repositories/activityEnrollment.repository';

// Strategy
import {
    ActivityEnrollmentStrategy,
    ActivityEnrollmentResult
} from './activity-enrollment.strategy';

@Injectable({
    providedIn: 'root',
})
export class DefaultActivityEnrollmentStrategy implements ActivityEnrollmentStrategy {

    private readonly activityEnrollmentRepository = inject(ActivityEnrollementRepository);

    enroll(data: {
        activity: Activity;
        userId: string;
        pricePaid: number;
    }): ActivityEnrollmentResult {

        const { activity, userId, pricePaid } = data;

        if (!activity) {
            return { success: false, reason: 'ACTIVITY_NOT_FOUND' };
        }

        const enrollments = this.activityEnrollmentRepository.findByActivity(activity.id);

        if (enrollments.length >= 30) {
            return { success: false, reason: 'ACTIVITY_FULL' };
        }

        const alreadyEnrolled = enrollments.some(e => e.userId === userId);

        if (alreadyEnrolled) {
            return { success: false, reason: 'ALREADY_ENROLLED' };
        }

        const enrollment: ActivityEnrollment = {
            id: crypto.randomUUID(),
            activityId: activity.id,
            userId,
            pricePaid,
            createdAt: new Date().toISOString()
        };

        this.activityEnrollmentRepository.save(enrollment);

        return {
            success: true,
            enrollment
        };
    }
}