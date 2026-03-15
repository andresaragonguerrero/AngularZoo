import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modelos
import { Animal } from '../../models/animal.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';


@Component({
  selector: 'app-daily-animal',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './daily-animal.html',
  styleUrl: './daily-animal.scss',
})
export class DailyAnimal implements OnInit {

  animal: Animal | null = null;
  isLoading = true;

  constructor(private readonly animalService: AnimalService) { }

  ngOnInit(): void {
    this.animalService.getRandomAnimal().subscribe(a => {
      this.animal = a;
      this.isLoading = false;
    });
  }
}
