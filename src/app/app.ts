import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    Hero,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'zoo';
}
