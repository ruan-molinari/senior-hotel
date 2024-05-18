import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
import localePtExtra from '@angular/common/locales/extra/pt'
import { provideEnvironmentNgxMask } from 'ngx-mask';

registerLocaleData(localePt, 'pt-BR', localePtExtra)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ]
};
