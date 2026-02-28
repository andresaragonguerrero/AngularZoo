import { Injectable } from '@angular/core';

// Modelos
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseFactory {

    createCourse(data: {
        name: string;
        description: string;
        season: any;
        startDate: string;
        capacity: number;
        price: number;
        isFreeForMembers: boolean;
    }): Course {

        return {
            id: crypto.randomUUID(),
            name: data.name,
            description: data.description,
            season: data.season,
            startDate: data.startDate,
            capacity: Math.max(0, data.capacity),
            price: Math.max(0, data.price),
            isFreeForMembers: data.isFreeForMembers
        };
    }
}