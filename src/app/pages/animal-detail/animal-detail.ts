import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Modelos
import { Animal } from '../../models/animal.interface';

// Servicios
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-detail',
  imports: [],
  templateUrl: './animal-detail.html',
  styleUrl: './animal-detail.scss',
})
export class AnimalDetail implements OnInit {
  
  animal: Animal | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly animalService: AnimalService
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.animalService.getAnimalById(id).subscribe(animal => {
      this.animal = animal ?? null;
    });

  }
}
