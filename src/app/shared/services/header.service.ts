import { Injectable, signal } from '@angular/core';

export type HeaderMode = 'fixed' | 'sticky';

@Injectable({ providedIn: 'root' })

export class HeaderService {
  mode = signal<HeaderMode>('sticky');

  setMode(mode: HeaderMode) {
    this.mode.set(mode);
  }
}