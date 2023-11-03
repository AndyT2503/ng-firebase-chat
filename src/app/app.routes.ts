import { Routes } from '@angular/router';
import { createGuard } from './shared/auth';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
    canMatch: [createGuard('nonAuth')],
  },
  {
    path: '',
    loadComponent: () => import('./chat-box/chat-box.component'),
    canMatch: [createGuard('auth')],
  },
];
