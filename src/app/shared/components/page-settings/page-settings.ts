import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// servicios
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-page-settings',
  imports: [
    TranslateModule,
  ],
  templateUrl: './page-settings.html',
  styleUrl: './page-settings.scss',
})
export class PageSettings {

  theme = signal<'light' | 'dark'>('light');
  contrast = signal(false);
  settingsOpen = signal(true);
  langOpen = signal(false);

  readonly languages: ('es' | 'en' | 'fr')[] = ['es', 'en', 'fr'];

  constructor(
    private readonly themeService: ThemeService,
    private readonly languageService: LanguageService,
  ) {
    // obtener el tema guardado
    this.theme.set(this.themeService.getTheme());

    // obtener el contraste guardado
    const savedContrast = localStorage.getItem('contrast') === 'true';
    this.contrast.set(savedContrast);

    if (savedContrast) {
      document.documentElement.classList.add('high-contrast');
    }
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

  toggleContrast() {
    const next = !this.contrast();
    this.contrast.set(next);

    const root = document.documentElement;

    if (next) {
      root.classList.add('high-contrast');
      localStorage.setItem('contrast', 'true');
    } else {
      root.classList.remove('high-contrast');
      localStorage.setItem('contrast', 'false');
    }
  }

  // lógica para colapsar los iconos de la configuración
  toggleColapsed() {
    this.settingsOpen.set(!this.settingsOpen());
  }

  // lógica del idioma
  toggleLang() {
    this.langOpen.set(!this.langOpen());
  }
  
  setLanguage(lang: 'es' | 'en' | 'fr') {
    this.languageService.setLanguage(lang);
  }

  get currentLanguage() {
    return this.languageService.currentLanguage;
  }
}
