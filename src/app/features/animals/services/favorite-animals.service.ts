import { inject, Injectable } from '@angular/core';

// Repositorios
import { FavoriteAnimalsRepository } from '../data/favoriteAnimals.repository';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteAnimalsService {

  private readonly repo = inject(FavoriteAnimalsRepository);

  constructor(private readonly authService: AuthService) { }

  private getCurrentUserId(): string | null {
    return this.authService.currentUser()?.id ?? null;
  }

  toggleFavorite(animalId: number): void {
    const userId = this.getCurrentUserId();
    if (!userId) return;

    if (this.repo.isFavorite(userId, animalId)) {
      this.repo.remove(userId, animalId);
    } else {
      this.repo.add(userId, animalId);
    }
  }

  isFavorite(animalId: number): boolean {
    const userId = this.getCurrentUserId();
    if (!userId) return false;
    return this.repo.isFavorite(userId, animalId);
  }

  getFavorites(): number[] {
    const userId = this.getCurrentUserId();
    if (!userId) return [];
    return this.repo.getAll(userId);
  }
}
