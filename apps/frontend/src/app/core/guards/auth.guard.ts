import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select((state) =>{return state?.auth} ),
      take(1),
      map((token) => {
        if (token) {
          return true;
        }
        this.router.navigate(['auth/login']);
        return false;
      })
    );
  }
}
