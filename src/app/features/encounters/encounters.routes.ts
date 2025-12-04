import { Routes } from '@angular/router';

export const ENCOUNTER_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/create-encounter/create-encounter').then(m => m.CreateEncounter),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/encounter-list/encounter-list').then(m => m.EncounterList),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/encounter-management/encounter-management').then(m => m.EncounterManagement),
  }
];