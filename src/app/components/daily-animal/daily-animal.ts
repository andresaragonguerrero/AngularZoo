import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Modelos
import { Animal } from '../../models/animal.interface';

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

  constructor(private readonly animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.getAnimalOfTheDay().subscribe(animal => {
      this.animal = animal;
      this.isLoading = false;
    });
  }
}
