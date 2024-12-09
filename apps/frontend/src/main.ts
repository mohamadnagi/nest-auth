import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { AuthEffects } from './app/auth/store/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authReducer } from './app/auth/store/reduces';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CookieService } from 'ngx-cookie-service';
import { importProvidersFrom } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { cookieSyncMetaReducer } from './app/auth/store/cookie-sync.reducer';
import { loadInitialState } from './app/auth/store/initial-state.loader';
import { SnackbarService } from './app/shared/snackbar.service';

const metaReducers: MetaReducer[] = [cookieSyncMetaReducer];


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      BrowserAnimationsModule
    ]),
    provideRouter(routes),
    provideStore(
      { auth: authReducer },
      {
        metaReducers,
        initialState: loadInitialState(),
      }
    ),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25 }),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    CookieService,
    SnackbarService
  ],
  
});
