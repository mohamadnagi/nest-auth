import { SnackbarService } from './../../../shared/snackbar.service';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private snackbarService = inject(SnackbarService)
  token!: string;

  constructor(){
    const token: any = this.route.snapshot.queryParamMap.get('token');
    this.verifyToken(token);
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  },
  {validators: this.passwordMatchValidator}
);

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onReset() {
    const token = this.token;
    if (this.resetPasswordForm.valid && this.resetPasswordForm.value.password && token)  {
      const password = this.resetPasswordForm.value.password;
      this.authService.resetPassword({password,token}).subscribe(res => {
        this.snackbarService.showSuccess('Password reset successfully');
        this.router.navigate(["/auth/login"]);
      },err => {
        this.snackbarService.showError(err)
      })
    }
  }

  verifyToken(token: string){
    this.authService.verifyResetPasswordToken(token).subscribe(res => {
      this.token = token;
    },err => {
      this.snackbarService.showError(err);
      this.router.navigateByUrl('/auth/login');
    })
  }

}
