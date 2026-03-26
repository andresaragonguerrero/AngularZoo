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

  getAnimalsByDiet(diet: string): Observable<Animal[]> {
    return this.filterAnimals(a => a.dieta.en === diet);
  }

  getAnimalsByConservationStatus(status: string): Observable<Animal[]> {
    return this.filterAnimals(a => a.estadoConservacion.en === status);
  }

  searchAnimals(searchTerm: string): Observable<Animal[]> {
    const term = searchTerm.toLowerCase().trim();
    return this.filterAnimals(a =>
      a.nombre.es.toLowerCase().includes(term) ||
      a.nombreCientifico.toLowerCase().includes(term) ||
      a.descripcion.es.toLowerCase().includes(term)
    );
  }


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

  getAnimalsByContinent(continent: string): Observable<Animal[]> {
    return this.filterAnimals(a => a.continente === continent);
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

  getAnimalOfTheDay(): Observable<Animal | null> {
    return this.getAnimals().pipe(
      map(animals => {
        if (!animals.length) return null;

        const now = new Date();

        // Formato YYYY-MM-DD
        const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

        // Comprobar si ya tenemos animal para hoy
        const stored = localStorage.getItem('dailyAnimal');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.date === todayKey) {
            // Devolver animal guardado
            return animals.find(a => a.id === parsed.animalId) ?? null;
          }
        }

        // Calcular animal del día
        const index = Math.floor(Math.random() * animals.length);
        const animalOfTheDay = animals[index];

        // Guardar en localStorage
        localStorage.setItem(
          'dailyAnimal',
          JSON.stringify({ date: todayKey, animalId: animalOfTheDay.id })
        );

        return animalOfTheDay;
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
