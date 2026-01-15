import { Routes } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainContentComponent } from './canvas/main-content/main-content';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainContentComponent,
    children: [
      {
        path: '',
        outlet: 'header',
        component: Header
      },
      {
        path: '',
        outlet: 'footer',
        component: Footer
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
// { path: 'home', component: homeComponent},
// { path: 'animals', component: animalsComponent},
// { path: 'ecosystems', component: ecosystemsComponent},
// { path: 'tickets', component: ticketsComponent},
// { path: 'membership', component: membershipComponent},
// { path: 'home', component: homeComponent},
