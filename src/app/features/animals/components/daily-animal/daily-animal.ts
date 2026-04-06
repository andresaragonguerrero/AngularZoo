import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// Modelos
import { Animal } from '../../models/animal.interface';
import { LocalizedString } from '../../../../models/localize.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-daily-animal',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  templateUrl: './daily-animal.html',
  styleUrl: './daily-animal.scss',
})
export class DailyAnimal implements OnInit {

  animal: Animal | null = null;
  isLoading = true;

  private readonly translate = inject(TranslateService);
  private readonly animalService = inject(AnimalService);
  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang)),
    { initialValue: this.translate.currentLang ?? 'es' }
  );

  ngOnInit(): void {
    this.animalService.getAnimalOfTheDay().subscribe(animal => {
      this.animal = animal;
      this.isLoading = false;
    });
  }

  getLocalizedField(field: LocalizedString): string {
    const lang = this.currentLang() as 'es' | 'en' | 'fr';
    return field[lang] ?? field['es'];
  }
}
