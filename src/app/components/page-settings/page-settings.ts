import { Component, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-page-settings',
  imports: [],
  templateUrl: './page-settings.html',
  styleUrl: './page-settings.scss',
})
export class PageSettings {

  theme = signal<'light' | 'dark'>('light');
  settingsOpen = signal(true);

  constructor(
    private readonly themeService: ThemeService,
  ) {
    this.theme.set(this.themeService.getTheme());
  }

  // lógica para cambiar el tema
  toggleTheme() {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.themeService.setTheme(next);
  }

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset['theme'] = theme;
  }

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';
  }

  // lógica para colapsar los iconos de la configuración
  toggleColapsed() {
    this.settingsOpen.set(!this.settingsOpen());
  }
}
