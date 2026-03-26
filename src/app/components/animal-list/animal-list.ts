import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Modelos
import { Animal } from '../../models/animal.interface';
import { LocalizedString } from '../../models/localize.interface';

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

  private readonly authService = inject(AuthService);
  private readonly favoriteAnimalsRepository = inject(FavoriteAnimalsRepository);
  private readonly translate = inject(TranslateService);

  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  private getUserId(): string | null {
    return this.authService.currentUser()?.id ?? null;
  }

  trackByAnimalId(index: number, animal: Animal): number {
    return animal.id;
  }

  formatWeight(min: number, max: number): string {
    return min === max ? `${min} kg` : `${min} - ${max} kg`;
  }

  getConservationStatusClass(status: LocalizedString): string {
    const map: Record<string, string> = {
      'vulnerable': 'status-vu',
      'endangered': 'status-en',
      'critically endangered': 'status-cr',
      'least concern': 'status-lc',
      'extinct': 'status-ex'
    };
    return map[status.en] ?? 'status-unknown';
  }

  getDietClass(diet: LocalizedString): string {
    return `diet-${diet.en}`;
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

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}
