import { Course } from '../models/course.interface';
import { CourseEnrollment } from '../models/courseEnrollment.interface';

export type EnrollmentResult =
    | { success: true; enrollment: CourseEnrollment }
    | { success: false; reason: EnrollmentFailureReason };

export type EnrollmentFailureReason =
    | 'COURSE_FULL'
    | 'ALREADY_ENROLLED'
    | 'COURSE_NOT_FOUND'
    | 'COURSE_ALREADY_STARTED';

export interface CourseEnrollmentStrategy {

    enroll(data: {
        course: Course;
        userId: string;
        pricePaid: number;
    }): EnrollmentResult;

}