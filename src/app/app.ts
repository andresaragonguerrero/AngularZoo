import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// componentes
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

// servicios
import { HeaderService } from './services/header.service';

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
}
