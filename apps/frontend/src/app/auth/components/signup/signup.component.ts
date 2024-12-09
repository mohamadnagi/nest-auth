import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MaterialModule } from '../../../shared/material.module';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../../../shared/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,FormsModule,CommonModule,RouterModule],
  providers: [
    SnackbarService
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      mobile_number: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator }
  );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { name, username, mobile_number, email, password } = this.signupForm.value;
      this.authService.signup({ name, username, mobile_number, email, password }).subscribe(res => {
        this.router.navigateByUrl('auth/login');
        this.snackbar.showSuccess('User Registered successfully')
      }, err => {
        this.snackbar.showError(err.error.message)
      });
    }
  }
}
