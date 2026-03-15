import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Repositorios
import { FavoriteAnimalsRepository } from '../repositories/favoriteAnimals.repository';

@Injectable({
  providedIn: 'root',
})
export class FavoriteAnimalsService {
  private readonly repo = inject(FavoriteAnimalsRepository);
  private readonly favoritesSubject = new BehaviorSubject<number[]>(this.repo.getAll());
  favorites$ = this.favoritesSubject.asObservable();

  toggleFavorite(animalId: number): void {
    if (this.repo.isFavorite(animalId)) {
      this.repo.remove(animalId);
    } else {
      this.repo.add(animalId);
    }
    this.favoritesSubject.next(this.repo.getAll());
  }

  isFavorite(animalId: number): boolean {
    return this.repo.isFavorite(animalId);
  }

  getFavorites(): number[] {
    return this.repo.getAll();
  }
}
