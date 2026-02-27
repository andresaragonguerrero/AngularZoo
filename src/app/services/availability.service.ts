import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {

  // Máximo de entradas disponibles por hora
  private readonly MAX_CAPACITY = 60;

  // clave: "2026-03-21_14:00"
  private slots: Record<string, number> = {};

  private buildKey(date: string, hour: string): string {
    return `${date}_${hour}`;
  }

  checkAvailability(date: string, hour: string, quantity: number): boolean {
    const key = this.buildKey(date, hour);
    const booked = this.slots[key] ?? 0;

    return booked + quantity <= this.MAX_CAPACITY;
  }

  reserve(date: string, hour: string, quantity: number): void {
    const key = this.buildKey(date, hour);
    const booked = this.slots[key] ?? 0;

    this.slots[key] = booked + quantity;
  }

  getRemainingSpots(date: string, hour: string): number {
    const key = this.buildKey(date, hour);
    const booked = this.slots[key] ?? 0;

    return this.MAX_CAPACITY - booked;
  }

  clear(): void {
    this.slots = {};
  }
}