import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Servicios
import { AnimalService } from '../../services/animal.service';
import { FavoriteAnimalsService } from '../../services/favorite-animals.service';

// Modelos
import { Animal } from '../../models/animal.interface';
import { LocalizedString } from '../../models/localize.interface';

@Component({
  selector: 'app-favorite-animals',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './favorite-animals.html',
  styleUrl: './favorite-animals.scss',
})
export class FavoriteAnimals implements OnInit {
  favoriteAnimals: Animal[] = [];
  isLoading = true;
  error: string | null = null;

  private readonly translate = inject(TranslateService);
  private readonly animalService = inject(AnimalService);
  private readonly favoritesService = inject(FavoriteAnimalsService);
  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const favoriteIds = this.favoritesService.getFavorites();
    this.animalService.getAnimals().subscribe({
      next: animals => {
        this.favoriteAnimals = animals.filter(a => favoriteIds.includes(a.id));
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Error cargando animales favoritos';
        this.isLoading = false;
      },
    });
  }

  toggleFavorite(animalId: number): void {
    this.favoritesService.toggleFavorite(animalId);
    this.favoriteAnimals = this.favoriteAnimals.filter(a =>
      this.favoritesService.isFavorite(a.id)
    );
  }

  isFavorite(animalId: number): boolean {
    return this.favoritesService.isFavorite(animalId);
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}
