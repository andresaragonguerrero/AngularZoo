import { Routes } from '@angular/router';

// componentes de las páginas
import { HomeComponent } from './pages/home/home';
import { AnimalsComponent } from './pages/animals/animals';
import { EcosystemsComponent } from './pages/ecosystems/ecosystems';
import { MembershipComponent } from './pages/membership/membership';
import { TicketsComponent } from './pages/tickets/tickets';

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
    path: 'membership',
    component: MembershipComponent
  },
    {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
