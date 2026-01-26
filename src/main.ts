import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';

import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './app/services/language.service';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeEs);
registerLocaleData(localeEn);
registerLocaleData(localeFr);

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
      })
    ),
    LanguageService
  ]
}).catch((err) => console.error(err));
