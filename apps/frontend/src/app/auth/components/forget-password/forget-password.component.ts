import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onReset() {
    if (this.forgotPasswordForm.valid && this.forgotPasswordForm.value.email) {
      const email = this.forgotPasswordForm.value.email;
      this.authService.forgetPassword(email).subscribe((res: any) => {
        // Temp solution because no mailer exit
        this.router.navigateByUrl('/auth/reset-password?token=' + res.data.resetToken)
      })
    }
  }

}
