import { Injectable } from '@angular/core';

// Modelos
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserFactory {
    createUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        age: number;
        isMember?: boolean;
    }): User {
        const now = new Date().toISOString();

        return {
            id: this.generateId(),
            firstName: this.sanitizeName(data.firstName),
            lastName: this.sanitizeName(data.lastName),
            email: this.sanitizeEmail(data.email),
            password: data.password,
            age: this.validateAge(data.age),
            isMember: data.isMember ?? false, // Por defecto no es socio
            createdAt: now,
            updatedAt: now
        };
    }

    private generateId(): string {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }

        // Fallback
        return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    private sanitizeName(name: string): string {
        return name.trim()
            .split(' ')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ');
    }

    private sanitizeEmail(email: string): string {
        return email.toLowerCase().trim();
    }

    private validateAge(age: number): number {
        return Math.max(0, Math.min(Math.round(age), 120));
    }

    getAgeGroup(age: number): 'CHILD' | 'ADULT' | 'SENIOR' {
        if (age < 13) return 'CHILD';
        if (age < 65) return 'ADULT';
        return 'SENIOR';
    }

    getFullName(firstName: string, lastName: string): string {
        return `${this.sanitizeName(firstName)} ${this.sanitizeName(lastName)}`.trim();
    }

    getBirthYear(age: number): number {
        const currentYear = new Date().getFullYear();
        return currentYear - age;
    }
}
