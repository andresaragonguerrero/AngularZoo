import { Routes } from '@angular/router';

// componentes de las páginas
import { HomeComponent } from './pages/home/home';
import { AnimalsComponent } from './features/animals/pages/animals/animals';
import { EcosystemsComponent } from './pages/ecosystems/ecosystems';
import { TicketsComponent } from './features/tickets/pages/tickets/tickets';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { TicketPurchase } from './features/tickets/pages/ticket-purchase/ticket-purchase';
import { CourseComponent } from './features/courses/pages/courses/courses';
import { ActivityComponent } from './features/activities/pages/activities/activities';
import { CoursePurchase } from './features/courses/pages/course-purchase/course-purchase';
import { ActivityPurchase } from './features/activities/pages/activity-purchase/activity-purchase';
import { FavoriteAnimals } from './features/animals/pages/favorite-animals/favorite-animals';
import { ComingSoon } from './pages/coming-soon/coming-soon';

// Guards
import { AuthGuard } from './features/auth/guards/auth';

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
    path: 'activity-purchase',
    component: ActivityPurchase
  },
  {
    path: 'favorite-animals',
    component: FavoriteAnimals,
    canActivate: [AuthGuard]
  },
  {
    path: 'animals/:id',
    loadComponent: () =>
      import('./features/animals/pages/animal-detail/animal-detail').then(m => m.AnimalDetail)
  },
  {
    path: 'coming-soon',
    component: ComingSoon
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];