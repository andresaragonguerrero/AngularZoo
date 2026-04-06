import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  private readonly _notification = signal<Notification | null>(null);

  notification = this._notification.asReadonly();

  show(
    message: string,
    type: NotificationType = 'info',
    duration = 3000
  ): void {
    this._notification.set({ message, type });

    setTimeout(() => {
      this._notification.set(null);
    }, duration);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }
}
