import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type SupportedLanguage = 'es' | 'en' | 'fr';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = signal<SupportedLanguage>('es');

  constructor(private readonly translate: TranslateService, private http: HttpClient) {
    translate.addLangs(['es', 'en', 'fr']);

    this.loadTranslations('es');
    this.loadTranslations('en');
    this.loadTranslations('fr');

    translate.use('es');
    this.currentLanguage.set('es');
  }

  setLanguage(lang: 'es' | 'en' | 'fr') {
    if (this.translate.getLangs().includes(lang)) {
      this.translate.use(lang);
      this.currentLanguage.set(lang);
    } else {
      console.warn(`Idioma ${lang} no soportado.`);
    }
  }

  getCurrentLanguage(): 'es' | 'en' | 'fr' {
    return this.currentLanguage();
  }

  private loadTranslations(lang: string) {
    this.http.get(`./assets/i18n/${lang}.json`).subscribe((translations: any) => {
      this.translate.setTranslation(lang, translations);
    });
  }
}
