import { Component, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  theme = signal<'light' | 'dark'>('light');
  isMenuOpen = signal(false);

  constructor(
    private readonly themeService: ThemeService,
  ) {
    this.theme.set(this.themeService.getTheme());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
