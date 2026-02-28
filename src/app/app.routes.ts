import { Routes } from '@angular/router';

// componentes de las páginas
import { HomeComponent } from './pages/home/home';
import { AnimalsComponent } from './pages/animals/animals';
import { EcosystemsComponent } from './pages/ecosystems/ecosystems';
import { TicketsComponent } from './pages/tickets/tickets';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { TicketPurchase } from './pages/ticket-purchase/ticket-purchase';
import { CourseComponent } from './pages/courses/courses';
import { ActivityComponent } from './pages/activities/activities';
import { CoursePurchase } from './pages/course-purchase/course-purchase';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'animals',
    component: AnimalsComponent
  },
  {
    path: 'ecosystems',
    component: EcosystemsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'purchase',
    component: TicketPurchase
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: 'courses',
    component: CourseComponent
  },
  {
    path: 'course-purchase',
    component: CoursePurchase
  },
  {
    path: 'activities',
    component: ActivityComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
