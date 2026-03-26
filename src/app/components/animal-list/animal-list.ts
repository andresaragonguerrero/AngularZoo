import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Modelos
import { Animal } from '../../models/animal.interface';

// Repositorios
import { FavoriteAnimalsRepository } from '../../repositories/favoriteAnimals.repository';

// Servicios
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-animal-list',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
})
export class AnimalList {

  @Input() animals: Animal[] = [];
  @Input() isLoading = false;
  @Input() error: string | null = null;

  private readonly favorites = new Set<number>();
  readonly brokenImages = new Set<number>();

  constructor(
    private readonly authService: AuthService,
    private readonly favoriteAnimalsRepository: FavoriteAnimalsRepository
  ) { }

  private getUserId(): string | null {
    return this.authService.currentUser()?.id ?? null;
  }

  trackByAnimalId(index: number, animal: Animal): number {
    return animal.id;
  }

  formatWeight(min: number, max: number): string {
    return min === max ? `${min} kg` : `${min} - ${max} kg`;
  }

  getConservationStatusClass(status: string): string {
    const map: Record<string, string> = {
      'preocupación menor': 'status-lc',
      'vulnerable': 'status-vu',
      'en peligro': 'status-en',
      'en peligro crítico': 'status-cr',
      'extinto': 'status-ex'
    };

    return map[status] ?? 'status-unknown';
  }

  getDietClass(diet: string): string {
    return `diet-${diet}`;
  }

  handleImageError(event: Event, animalId: number): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    this.brokenImages.add(animalId);
  }

  isFavorite(animalId: number): boolean {
    const userId = this.getUserId();
    if (!userId) return false;
    return this.favoriteAnimalsRepository.isFavorite(userId, animalId);
  }

  toggleFavorite(animalId: number): void {
    const userId = this.getUserId();
    if (!userId) return;

    if (this.favoriteAnimalsRepository.isFavorite(userId, animalId)) {
      this.favoriteAnimalsRepository.remove(userId, animalId);
    } else {
      this.favoriteAnimalsRepository.add(userId, animalId);
    }
  }
}
