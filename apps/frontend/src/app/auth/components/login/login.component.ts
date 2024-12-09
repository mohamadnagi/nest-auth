import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../models/auth.model';
import * as AuthActions from './../../store/actions';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  private store = inject<Store<{ auth: AuthState }>>(Store);
  private fb = inject(FormBuilder);
  
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({ credentials: this.loginForm.value }));
    }
  }
}
