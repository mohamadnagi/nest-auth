// auth.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './actions';
import { catchError, map, switchMap, tap, of, take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { CookieService } from '../../core/services/cookie.service';
import { select, Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private authService = inject(AuthService);
	private router = inject(Router);
	private snackBar = inject(MatSnackBar);
	private cookieService = new CookieService();
	private store = inject(Store);


	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login),
			switchMap(({ credentials }) =>
				this.authService.login(credentials).pipe(
					map((response) =>
						AuthActions.loginSuccess({ response })
					),
					catchError((error) =>
						of(AuthActions.loginFailure({ error: error.message }))
					)
				)
			)
		)
	);

	loginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.loginSuccess),
				tap(({ response }) => {
					// Store the user in cookies
					this.cookieService.setCookie('auth', response.accessToken);

					// Show success message
					this.snackBar.open('Login Successful!', 'Close', {
						duration: 3000,
					});
					// Navigate to the users page
					this.router.navigate(['/users']);
				})
			),
		{ dispatch: false }
	);

	loginFailure$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.loginFailure),
				tap(({ error }) => {
					// Show error message
					this.snackBar.open(`Login Failed: ${error}`, 'Close', {
						duration: 3000,
					});
				})
			),
		{ dispatch: false }
	);

	logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logout),
				tap(() => {
					this.snackBar.open('You have been logged out.', 'Close', {
						duration: 3000,
					});
					this.cookieService.deleteCookie('auth');
				}),
				switchMap(() =>
					this.store.pipe(
						select((state) => {
							return state.auth?.token;
						}),
						take(1),
						tap((authToken) => {
							if (!authToken) {
								this.router.navigateByUrl('/auth/login')						
							}
						})
					)
				)
			),
		{ dispatch: false }
	);

}
