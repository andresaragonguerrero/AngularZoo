import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Servicios
import { AnimalService } from '../../services/animal.service';
import { FavoriteAnimalsService } from '../../services/favorite-animals.service';

// Modelos
import { Animal } from '../../models/animal.interface';

@Component({
  selector: 'app-favorite-animals',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './favorite-animals.html',
  styleUrl: './favorite-animals.scss',
})
export class FavoriteAnimals implements OnInit {
  favoriteAnimals: Animal[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private readonly animalService: AnimalService,
    private readonly favoritesService: FavoriteAnimalsService
  ) { }

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
}
