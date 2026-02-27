import { Injectable } from '@angular/core';

// Modelos
import { AvailabilitySlot } from '../models/availability-slot';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityRepository {

  private slots: Record<string, AvailabilitySlot> = {};

  private buildKey(date: string, hour: string): string {
    return `${date}_${hour}`;
  }

  findSlot(date: string, hour: string): AvailabilitySlot | null {
    return this.slots[this.buildKey(date, hour)] ?? null;
  }

  saveSlot(slot: AvailabilitySlot): void {
    const key = this.buildKey(slot.date, slot.hour);
    this.slots[key] = slot;
  }

  clear(): void {
    this.slots = {};
  }
}