import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Modelos
import { Animal } from '../models/animal.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private animalsCache?: Observable<Animal[]>;

  constructor(private readonly http: HttpClient) { }

  getAnimals(): Observable<Animal[]> {
    // La estrategia que se emplea evita que, cada vez que se quiera obtener un animal,
    // se tenga que consumir el JSON
    // Por ello se comprueba si lo ya lo guardamos en caché (animalsCache); 
    // en caso de no tenerlo lo consumimos del JSON (??= this.http.get<Animal[]>('/assets/data/animals.json'))
    // y guardamos la última versión en animalsCache
    this.animalsCache ??= this.http.get<Animal[]>('/assets/data/animals.json').pipe(
      shareReplay(1)
    );

    return this.animalsCache;
  }

  getAnimalById(id: number): Observable<Animal | undefined> {
    return this.filterAnimals(a => a.id === id).pipe(
      map(result => result[0])
    );
  }

  getAnimalsByEcosystem(ecosystemId: number): Observable<Animal[]> {
    return this.filterAnimals(a => a.ecosistemaId === ecosystemId);
  }

  getAnimalsByDiet(diet: Animal['dieta']): Observable<Animal[]> {
    return this.filterAnimals(a => a.dieta === diet);
  }

  getAnimalsByContinent(continent: string): Observable<Animal[]> {
    return this.filterAnimals(a => a.continente === continent);
  }

  getAnimalsByConservationStatus(status: Animal['estadoConservacion']): Observable<Animal[]> {
    return this.filterAnimals(a => a.estadoConservacion === status);
  }

  searchAnimals(searchTerm: string): Observable<Animal[]> {
    const term = searchTerm.toLowerCase().trim();

    return this.filterAnimals(a =>
      a.nombre.toLowerCase().includes(term) ||
      a.nombreCientifico.toLowerCase().includes(term) ||
      a.descripcion.toLowerCase().includes(term)
    );
  }

  getRandomAnimal(): Observable<Animal | null> {
    return this.getAnimals().pipe(
      map(animals => {
        if (!animals.length) return null;
        const index = Math.floor(Math.random() * animals.length);
        return animals[index];
      })
    );
  }

  clearCache(): void {
    this.animalsCache = undefined;
  }

  private filterAnimals(predicate: (animal: Animal) => boolean): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.filter(predicate))
    );
  }
}
