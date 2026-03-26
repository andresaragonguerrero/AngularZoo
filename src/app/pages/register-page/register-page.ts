import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Componentes
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  imports: [
    RegisterForm,
    TranslateModule,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})

export class RegisterPage {

}
