// non-auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return of(true);
  }
}
