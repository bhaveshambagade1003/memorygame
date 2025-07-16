import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', loadComponent: () => import('./app.component').then(c => c.AppComponent) },
  { path: '**', redirectTo: '/game' }
];
