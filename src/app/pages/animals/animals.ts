import { Component } from '@angular/core';

// Componentes
import { AnimalList } from '../../components/animal-list/animal-list';

@Component({
  selector: 'app-animals',
  imports: [
    AnimalList
  ],
  templateUrl: './animals.html',
  styleUrl: './animals.scss',
})
export class AnimalsComponent {

}
