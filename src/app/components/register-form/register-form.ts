import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})

export class RegisterForm {
  registerForm: FormGroup;
  isLoading = false;
  emailExists = false;

  registrationSuccess = false;
  registeredUser: any = null;
  errorMessage = '';

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      agreeToTerms: [false, [Validators.requiredTrue]],
      becomeMember: [false]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.emailExists = false;
      this.registrationSuccess = false;
      this.errorMessage = '';

      try {
        const user = await this.userService.register(this.registerForm.value);

        if (user) {
          // redirige después de 2 segundos a home o a tickets, según se prefiera
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          this.emailExists = true;
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }

      try {
        const user = await this.userService.register(this.registerForm.value);

        if (user) {
          this.registrationSuccess = true;
          this.registeredUser = user;
          this.registerForm.reset();
        } else {
          this.emailExists = true;
          this.errorMessage = 'Este email ya está registrado';
        }
      } catch (error) {
        this.errorMessage = 'Error en el registro. Intenta nuevamente.';
        console.error('Error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
