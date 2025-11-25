import { Routes } from '@angular/router';

export const ENCOUNTER_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-encounter/create-encounter').then(m => m.CreateEncounter),
  },
];