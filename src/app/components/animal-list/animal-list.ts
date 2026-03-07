import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modelos
import { Animal } from '../../models/animal.interface';

@Component({
  selector: 'app-animal-list',
  imports: [
    CommonModule,
    RouterModule,
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
    return this.favorites.has(animalId);
  }

  toggleFavorite(animalId: number): void {
    this.favorites.has(animalId)
      ? this.favorites.delete(animalId)
      : this.favorites.add(animalId);
  }
}
