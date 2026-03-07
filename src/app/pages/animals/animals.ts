import { Component, OnInit } from '@angular/core';

// Componentes
import { AnimalList } from '../../components/animal-list/animal-list';

// Modelos
import { Animal } from '../../models/animal.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';
import { AnimalFilters } from '../../components/animal-filters/animal-filters';

@Component({
  selector: 'app-animals',
  imports: [
    AnimalList,
    AnimalFilters
  ],
  templateUrl: './animals.html',
  styleUrl: './animals.scss',
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  private searchTerm = '';
  private dietFilter = '';
  private continentFilter = '';

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

  onContinentChange(continent: string): void {
    this.continentFilter = continent;
    this.applyFilters();
  }

  onClear(): void {
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
}
