import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_ENVIRONMENT } from '@core/config/app-environment.token';
import { environment } from '@environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    //provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: APP_ENVIRONMENT, useValue: environment }
  ]
};
