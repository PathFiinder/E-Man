import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners, Provider,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import { TokenGuard } from './shared/guards/token.guard';
import { DEFAULT_THEME, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FirebaseOptionsConfig } from './config/firebase-options.config';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    TokenGuard,
    NbThemeModule.forRoot({ name: 'default' }, [DEFAULT_THEME]).providers as Provider,
    NbEvaIconsModule,
    provideFirebaseApp(() => initializeApp(FirebaseOptionsConfig)),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot({
      timeOut: 5000,
      maxOpened: 3,
      preventDuplicates: false,
      closeButton: false,
    }).providers as Provider,
    BrowserModule,
    provideAnimationsAsync(),
  ]
};
