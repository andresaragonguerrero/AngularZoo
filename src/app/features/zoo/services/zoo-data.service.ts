import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZooDataService {
  
  private readonly http = inject(HttpClient);

  getZooData(): Observable<any> {
    return this.http.get('assets/data/zoo-data.json');
  }
}
