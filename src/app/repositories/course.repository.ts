import { Injectable } from '@angular/core';

// Modelos
import { Course } from '../models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseRepository {

    private readonly STORAGE_KEY = 'zoo_courses';

    save(course: Course): void {
        const courses = this.findAll();
        courses.push(course);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(courses));
    }

    findAll(): Course[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    findById(id: string): Course | undefined {
        return this.findAll().find(course => course.id === id);
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}