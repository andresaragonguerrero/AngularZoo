import { Activity } from '../models/activity.interface';
import { ActivityEnrollment } from '../models/activityEnrollment.interface';

export type ActivityEnrollmentFailureReason =
    | 'ACTIVITY_FULL'
    | 'ALREADY_ENROLLED'
    | 'ACTIVITY_NOT_FOUND';

export type ActivityEnrollmentResult =
    | { success: true; enrollment: ActivityEnrollment }
    | { success: false; reason: ActivityEnrollmentFailureReason };

export interface ActivityEnrollmentStrategy {

    enroll(data: {
        activity: Activity;
        userId: string;
        pricePaid: number;
    }): ActivityEnrollmentResult;

}