import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  userDisplayName = computed(() => {
    const user = this.currentUser();
    if (!user) return null;

    return user.firstName ?? user.email;
  });

  logout(): void {
    const userEmail = this.currentUser()?.email || 'Usuario';
    this.authService.logout();
    this.notificationService.success(`Sesión cerrada correctamente: ${userEmail}`);
  }
}
