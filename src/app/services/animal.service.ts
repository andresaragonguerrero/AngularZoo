import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Modelos
import { Animal } from '../models/animal.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  // Usamos shareReplay para cachear la respuesta y no hacer múltiples peticiones
  private animalsCache: Observable<Animal[]> | null = null;

  constructor(private readonly http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    this.animalsCache ??= this.http.get<Animal[]>('/assets/data/animals.json').pipe(
      shareReplay(1)
    );

    return this.animalsCache;
  }

  getAnimalById(id: number): Observable<Animal | undefined> {
    return this.getAnimals().pipe(
      map(animals => animals.find(animal => animal.id === id))
    );
  }

  getAnimalsByEcosystem(ecosystemId: number): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.filter(animal => animal.ecosistemaId === ecosystemId))
    );
  }

  getAnimalsByDiet(diet: string): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.filter(animal => animal.dieta === diet))
    );
  }

  getAnimalsByContinent(continent: string): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.filter(animal => animal.continente === continent))
    );
  }

  getAnimalsByConservationStatus(status: string): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.filter(animal => animal.estadoConservacion === status))
    );
  }

  searchAnimals(searchTerm: string): Observable<Animal[]> {
    const term = searchTerm.toLowerCase().trim();
    return this.getAnimals().pipe(
      map(animals => animals.filter(animal =>
        animal.nombre.toLowerCase().includes(term) ||
        animal.nombreCientifico.toLowerCase().includes(term) ||
        animal.descripcion.toLowerCase().includes(term)
      ))
    );
  }

  getRandomAnimal(): Observable<Animal | null> {
    return this.getAnimals().pipe(
      map(animals => {
        if (animals.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
      })
    );
  }

  clearCache(): void {
    this.animalsCache = null;
  }
}
