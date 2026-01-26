import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// secciones del home
import { Hero } from "../../sections/hero/hero";
import { TicketPurchase } from "../../sections/ticket-purchase/ticket-purchase";
import { ParkInfo } from "../../sections/park-info/park-info";
import { Courses } from "../../sections/courses/courses";
import { Activities } from "../../sections/activities/activities";
import { TicketForm } from '../../sections/ticket-form/ticket-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    TicketPurchase,
    TicketForm,
    ParkInfo,
    Courses,
    Activities,
    RegisterForm,
    LoginForm,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  // lógica para alternar entre las secciones información de las entradas y su compra
  showTicketForm = false;
}