import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  
  providers: [provideHttpClient(withFetch()),
    provideRouter(routes), 
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
  
    provideStore(),
    // provideState(PortfolioFeature),
    // provideEffects(PortfolioEffects),
    // provideAnimationsAsync(),
    // MessageService
  
  
  
  ],


   
};
