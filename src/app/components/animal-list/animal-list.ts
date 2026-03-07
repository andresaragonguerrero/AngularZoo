import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

// Modelos
import { Animal } from '../../models/animal.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './animal-list.html',
  styleUrl: './animal-list.scss',
})
export class AnimalList implements OnInit {
  @Input() showFilters = true;
  @Input() limit?: number;

  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  isLoading = true;
  error: string | null = null;

  private searchTerm = '';
  private dietFilter = '';
  private continentFilter = '';

  private readonly favorites = new Set<number>();
  readonly brokenImages = new Set<number>();

  constructor(private readonly animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  private loadAnimals(): void {
    this.animalService.getAnimals().subscribe({
      next: (animals) => {
        const result = this.limit ? animals.slice(0, this.limit) : animals;

        this.animals = result;
        this.filteredAnimals = [...result];

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar animales:', err);
        this.error = 'No se pudieron cargar los animales.';
        this.isLoading = false;
      }
    });
  }

  trackByAnimalId(index: number, animal: Animal): number {
    return animal.id;
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase().trim();
    this.applyFilters();
  }

  onDietFilter(diet: string): void {
    this.dietFilter = diet;
    this.applyFilters();
  }

  onContinentFilter(continent: string): void {
    this.continentFilter = continent;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.dietFilter = '';
    this.continentFilter = '';
    this.filteredAnimals = [...this.animals];
  }

  private applyFilters(): void {
    this.filteredAnimals = this.animals.filter(animal => {

      const matchesSearch =
        !this.searchTerm ||
        animal.nombre.toLowerCase().includes(this.searchTerm) ||
        animal.nombreCientifico.toLowerCase().includes(this.searchTerm) ||
        animal.descripcion.toLowerCase().includes(this.searchTerm);

      const matchesDiet =
        !this.dietFilter || animal.dieta === this.dietFilter;

      const matchesContinent =
        !this.continentFilter || animal.continente === this.continentFilter;

      return matchesSearch && matchesDiet && matchesContinent;
    });
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
