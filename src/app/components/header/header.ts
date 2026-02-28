import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { PageSettings } from "../page-settings/page-settings";
import { Nav } from "../nav/nav";
import { Auth } from "../auth/auth";

// Servicios
import { ThemeService } from '../../services/theme.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    PageSettings,
    Nav,
    Auth
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  theme = signal<'light' | 'dark'>('light');
  isMenuOpen = signal(false);
  isHamOpen = signal(false);

  headerService = inject(HeaderService);

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

  toggleHam() {
    this.isHamOpen.update(value => !value);
  }
}
