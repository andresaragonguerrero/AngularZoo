import { Component, OnInit } from '@angular/core';

// Componentes
import { AnimalList } from '../../components/animal-list/animal-list';
import { AnimalFilters } from '../../components/animal-filters/animal-filters';
import { AnimalPagination } from '../../components/animal-pagination/animal-pagination';

// Modelos
import { Animal } from '../../models/animal.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animals',
  imports: [
    AnimalList,
    AnimalFilters,
    AnimalPagination,
  ],
  templateUrl: './animals.html',
  styleUrl: './animals.scss',
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  currentPage = 1;
  readonly pageSize = 5;

  private searchTerm = '';
  private dietFilter = '';
  private continentFilter = '';
  private conservationStatusFilter = '';

  constructor(private readonly animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
      this.filteredAnimals = [...animals];
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase().trim();
    this.applyFilters();
  }

  onDietChange(diet: string): void {
    this.dietFilter = diet;
    this.applyFilters();
  }

  onConservationStatusChange(status: string): void {
    this.conservationStatusFilter = status;
    this.applyFilters();
  }

  onContinentChange(continent: string): void {
    this.continentFilter = continent;
    this.applyFilters();
  }

  onClear(): void {
    this.searchTerm = '';
    this.dietFilter = '';
    this.continentFilter = '';
    this.conservationStatusFilter = '';
    this.filteredAnimals = [...this.animals];
  }

  get paginatedAnimals(): Animal[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredAnimals.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  private applyFilters(): void {
    this.filteredAnimals = this.animals.filter(animal => {
      const matchesSearch =
        !this.searchTerm ||
        animal.nombre.es.toLowerCase().includes(this.searchTerm) ||
        animal.nombreCientifico.toLowerCase().includes(this.searchTerm) ||
        animal.descripcion.es.toLowerCase().includes(this.searchTerm);
      const matchesDiet =
        !this.dietFilter || animal.dieta.en === this.dietFilter;
      const matchesContinent =
        !this.continentFilter || animal.continente.en.toLowerCase() === this.continentFilter.toLowerCase();
      const matchesConservationStatus =
        !this.conservationStatusFilter ||
        animal.estadoConservacion.en === this.conservationStatusFilter;
      return matchesSearch && matchesDiet && matchesContinent && matchesConservationStatus;
    });
    const totalPages = Math.ceil(this.filteredAnimals.length / this.pageSize);
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }
  }
}
