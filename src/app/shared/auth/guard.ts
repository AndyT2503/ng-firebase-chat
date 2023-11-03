import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const createGuard =
  (type: 'auth' | 'nonAuth'): CanMatchFn =>
  () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.user$.pipe(
      map((user) => {
        const isAuth = !!user;
        const isAuthGuard = type === 'auth';
        return (
          isAuth === isAuthGuard ||
          router.createUrlTree(isAuthGuard ? ['/login'] : ['/'])
        );
      })
    );
  };
