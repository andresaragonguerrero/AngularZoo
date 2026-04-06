import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Servicios
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm: FormGroup;
  isLoading = false;
  emailExists = false;

  error = this.authService.error;
  authIsLoading = this.authService.isLoading;

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      agreeToTerms: [false, [Validators.requiredTrue]],
      becomeMember: [false],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.emailExists = false;
      this.error.set(null);

      try {
        const user = await this.authService.register(this.registerForm.value);

        if (user) {
          console.log('Registro exitoso. Usuario autenticado:', user.email);

          // Limpia el formulario
          this.registerForm.reset({
            agreeToTerms: false,
            becomeMember: false
          });

          // Redirige después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);

        } else {
          this.emailExists = true;
        }
      } catch (error) {
        console.error('Error:', error);
        this.emailExists = true;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
