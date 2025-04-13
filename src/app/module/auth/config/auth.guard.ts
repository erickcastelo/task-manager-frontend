import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth.service';
import { User } from '../../login/models/User';
import { AuthSubject } from '../service/auth.subject';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const authSubject = inject(AuthSubject);

  const token = cookieService.get('token');

  if (!token) {
    router.navigate(['/']);
    return false;
  }
  authService.me(token).subscribe({
    next: (user: User) => {
      if (!user) {
        router.navigate(['/']);
        return false;
      }

      authSubject.setUser(user);
      return true;
    },
  });

  return true;
};
