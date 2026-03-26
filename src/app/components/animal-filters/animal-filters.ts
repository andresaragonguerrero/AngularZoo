import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Modelos
import { Animal } from '../../models/animal.interface';


@Component({
  selector: 'app-animal-filters',
  imports: [
    TranslateModule,
  ],
  templateUrl: './animal-filters.html',
  styleUrl: './animal-filters.scss',
})
export class AnimalFilters {
  @Output() searchChange = new EventEmitter<string>();
  @Output() dietChange = new EventEmitter<Animal['dieta'] | ''>();
  @Output() continentChange = new EventEmitter<string | ''>();
  @Output() conservationStatusChange = new EventEmitter<Animal['estadoConservacion'] | ''>();
  @Output() clear = new EventEmitter<void>();

  onSearch(term: string): void {
    this.searchChange.emit(term);
  }

  onDietChange(diet: string): void {
    this.dietChange.emit(diet as Animal['dieta'] | '');
  }

  onContinentChange(continent: string): void {
    this.continentChange.emit(continent);
  }

  onConservationStatusChange(conservationStatus: string): void {
    this.conservationStatusChange.emit(conservationStatus as Animal['estadoConservacion'] | '');
  }

  onClear(): void {
    this.clear.emit();
  }
}
