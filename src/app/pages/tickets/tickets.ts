import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Servicios
import { PriceCalculatorService } from '../../services/price-calculator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tickets',
  imports: [
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class TicketsComponent {
  
  private readonly priceCalculator = inject(PriceCalculatorService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  // el usuario pulsa el botón de compra de entradas regular
  buyAsGuest() {
    this.priceCalculator.setMemberStatus(false);
    this.router.navigate(['/purchase']);
  }

  // el usuario pulsa el botón para acceder al espacio de compra de entradas para miembros
  buyAsMember() {
    // si no se logueó -> /login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: '/purchase', mode: 'member' }
      });
      return;
    }

    // si se logueó ya
    this.priceCalculator.setMemberStatus(true);
    this.router.navigate(['/purchase']);
  }
}
