// auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../../shared/snackbar.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const snackbarService = inject(SnackbarService);

	// Get the access token from cookies
	const accessToken = getAccessTokenFromCookies();

	// Clone and attach the token to headers if it exists
	const clonedRequest = req.clone({
		setHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
	});

	return next(clonedRequest).pipe(
		catchError((error: HttpErrorResponse) => {
			if (error.status === 401) {
				// Unauthorized or missing token
				snackbarService.showError('Session expired. Please log in again.');
				router.navigate(['/auth/login']);
			}
			return throwError(() => new Error(error.error.message));
		})
	);
};

/**
 * Utility function to get the accessToken from cookies
 */
function getAccessTokenFromCookies(): string | null {
	const match = document.cookie.match(new RegExp('(^| )auth=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : null;
}
