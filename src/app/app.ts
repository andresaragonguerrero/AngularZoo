import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

// componentes
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

// servicios
import { HeaderService } from './shared/services/header.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'zoo';
  headerService = inject(HeaderService);

  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);

      const scrollableElements = document.querySelectorAll('*');
      scrollableElements.forEach(el => {
        if (el.scrollTop > 0) {
          el.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      document.body.focus();
    });
  }
}
