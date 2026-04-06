import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FavoriteAnimalsRepository {
    
    private readonly STORAGE_KEY_PREFIX = 'zoo_favorite_animals_';

    private getKey(userId: string): string {
        return `${this.STORAGE_KEY_PREFIX}${userId}`;
    }
    getAll(userId: string): number[] {
        const data = localStorage.getItem(this.getKey(userId));
        return data ? JSON.parse(data) : [];
    }

    add(userId: string, animalId: number): void {
        const favorites = new Set(this.getAll(userId));
        favorites.add(animalId);
        localStorage.setItem(this.getKey(userId), JSON.stringify([...favorites]));
    }

    remove(userId: string, animalId: number): void {
        const favorites = new Set(this.getAll(userId));
        favorites.delete(animalId);
        localStorage.setItem(this.getKey(userId), JSON.stringify([...favorites]));
    }

    isFavorite(userId: string, animalId: number): boolean {
        return this.getAll(userId).includes(animalId);
    }

    clear(userId: string): void {
        localStorage.removeItem(this.getKey(userId));
    }
}