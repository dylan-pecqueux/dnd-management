import { Routes } from '@angular/router';
import { CreateEncounter } from './features/encounters/pages/create-encounter/create-encounter';

export const routes: Routes = [
  { path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
  },
  { path: 'encounters', loadChildren: () => import('./features/encounters/encounters.routes').then(m => m.ENCOUNTER_ROUTES) },
];
