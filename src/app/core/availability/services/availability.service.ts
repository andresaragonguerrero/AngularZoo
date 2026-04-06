import { Injectable } from '@angular/core';

// Repositorios
import { AvailabilityRepository } from '../data/availability.repository';

@Injectable({
  providedIn: 'root',
})

export class AvailabilityService {

  // Máximo de entradas disponibles por hora
  private readonly MAX_CAPACITY = 60;

  constructor(
    private readonly availabilityRepository: AvailabilityRepository
  ) { }

  checkAvailability(date: string, hour: string, quantity: number): boolean {
    const slot = this.availabilityRepository.findSlot(date, hour);

    const booked = slot?.booked ?? 0;
    const capacity = slot?.capacity ?? this.MAX_CAPACITY;

    return quantity + booked <= capacity;
  }

  reserve(date: string, hour: string, quantity: number): void {
    const keySlot = this.availabilityRepository.findSlot(date, hour);

    if (!keySlot) {
      this.availabilityRepository.saveSlot({
        date,
        hour,
        booked: quantity,
        capacity: this.MAX_CAPACITY
      });
      return;
    }

    const updatedSlot = {
      ...keySlot,
      booked: keySlot.booked + quantity
    };

    this.availabilityRepository.saveSlot(updatedSlot);
  }

  getRemainingSpots(date: string, hour: string): number {
    const slot = this.availabilityRepository.findSlot(date, hour);

    if (!slot) {
      return this.MAX_CAPACITY;
    }

    return slot.capacity - slot.booked;
  }
}