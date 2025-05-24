import {ApplicationConfig, EnvironmentProviders, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { importProvidersFrom } from '@angular/core';

export const appConfig: { providers: (EnvironmentProviders | UsuarioService)[] } = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),importProvidersFrom(HttpClientModule),
    UsuarioService]
};
