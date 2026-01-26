import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  isLoading = signal(false);
  showPassword = signal(false);

  error = this.authService.error;
  authIsLoading = this.authService.isLoading;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // para ampliar en un futuro: place holder
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.error.set(null);

      try {
        const credentials: LoginCredentials = {
          email: this.loginForm.get('email')?.value,
          // password: this.loginForm.get('password')?.value
        };

        const success = await this.authService.login(credentials);

        if (success) {
          console.log('Login exitoso');

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);

          // Limpiar formulario
          this.loginForm.reset();
        } else {
          console.log('Login fallido');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword.update(value => !value);
  }

  // Para testing rápido
  async quickLogin(email: string) {
    this.loginForm.patchValue({ email });
    await this.onSubmit();
  }
}
