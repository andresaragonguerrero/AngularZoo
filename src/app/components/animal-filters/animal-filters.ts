import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-animal-filters',
  imports: [],
  templateUrl: './animal-filters.html',
  styleUrl: './animal-filters.scss',
})
export class AnimalFilters {
  @Output() searchChange = new EventEmitter<string>();
  @Output() dietChange = new EventEmitter<string>();
  @Output() continentChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onSearch(term: string): void {
    this.searchChange.emit(term);
  }

  onDietChange(diet: string): void {
    this.dietChange.emit(diet);
  }

  onContinentChange(continent: string): void {
    this.continentChange.emit(continent);
  }

  onClear(): void {
    this.clear.emit();
  }
}
