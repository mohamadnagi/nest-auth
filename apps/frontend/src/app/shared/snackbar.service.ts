// snackbar.service.ts
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class SnackbarService {
	private snackBar = inject(MatSnackBar);
	
	/**
	 * Show success message
	 */
	showSuccess(message: string, action = 'Close', duration = 3000): void {
		this.snackBar.open(message, action, {
			duration,
			panelClass: ['snackbar-success'],
			horizontalPosition: 'right',
			verticalPosition: 'top',
		});
	}

	/**
	 * Show error message
	 */
	showError(message: string, action = 'Close', duration = 3000): void {
		this.snackBar.open(message, action, {
			duration,
			panelClass: ['snackbar-error'],
			horizontalPosition: 'right',
			verticalPosition: 'top',
		});
	}

	/**
	 * Show custom message
	 */
	showMessage(message: string, action = 'Close', duration = 3000): void {
		this.snackBar.open(message, action, {
			duration,
			horizontalPosition: 'right',
			verticalPosition: 'top',
		});
	}
}
