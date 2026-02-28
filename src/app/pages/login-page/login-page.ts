import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Componentes
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    LoginForm,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

}
