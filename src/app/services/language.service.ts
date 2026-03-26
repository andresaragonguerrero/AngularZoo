import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type SupportedLanguage = 'es' | 'en' | 'fr';
const STORAGE_KEY = 'lang';
const SUPPORTED: SupportedLanguage[] = ['es', 'en', 'fr'];

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = signal<SupportedLanguage>('es');

  constructor(private readonly translate: TranslateService) {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    const initial: SupportedLanguage =
      saved && SUPPORTED.includes(saved) ? saved : 'es';

    translate.addLangs(SUPPORTED);
    translate.use(initial);
    this.currentLanguage.set(initial);
  }

  setLanguage(lang: SupportedLanguage): void {
    if (!SUPPORTED.includes(lang)) {
      console.warn(`Idioma "${lang}" no soportado.`);
      return;
    }
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage();
  }

  getSupportedLanguages(): SupportedLanguage[] {
    return SUPPORTED;
  }
}