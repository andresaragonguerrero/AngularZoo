import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FavoriteAnimalsRepository {
    private readonly STORAGE_KEY = 'zoo_favorite_animals';

    getAll(): number[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    add(animalId: number): void {
        const favorites = new Set(this.getAll());
        favorites.add(animalId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...favorites]));
    }

    remove(animalId: number): void {
        const favorites = new Set(this.getAll());
        favorites.delete(animalId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...favorites]));
    }

    isFavorite(animalId: number): boolean {
        return this.getAll().includes(animalId);
    }

    clear(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}