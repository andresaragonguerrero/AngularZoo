import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-animal-filters',
  imports: [
    TranslateModule,
  ],
  templateUrl: './animal-filters.html',
  styleUrl: './animal-filters.scss',
})
export class AnimalFilters {
  
  @Input() selectedDiet = '';
  @Input() selectedContinent = '';
  @Input() selectedConservationStatus = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() continentChange = new EventEmitter<string | ''>();
  @Output() clear = new EventEmitter<void>();
  @Output() dietChange = new EventEmitter<string>();
  @Output() conservationStatusChange = new EventEmitter<string>();

  onSearch(term: string): void {
    this.searchChange.emit(term);
  }

  onDietChange(diet: string): void {
    this.dietChange.emit(diet);
  }

  onConservationStatusChange(conservationStatus: string): void {
    this.conservationStatusChange.emit(conservationStatus);
  }

  onContinentChange(continent: string): void {
    this.continentChange.emit(continent);
  }

  onClear(): void {
    this.clear.emit();
  }
}
