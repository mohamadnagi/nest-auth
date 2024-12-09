import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  standalone: true,
  imports: [MaterialModule],
})
export class LogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  confirmLogout(): void {
    this.dialogRef.close(true);
  }

  cancelLogout(): void {
    this.dialogRef.close(false);
  }
}
