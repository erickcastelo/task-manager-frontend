import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AuthSubject } from '../service/auth.subject';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const authSubject = inject(AuthSubject);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const user = authSubject.getCurrentUser();
  const token = cookieService.get('token');

  if (user) return of(true);

  return authService.init(token).pipe(
    map((isValid) => {
      if (!isValid) {
        router.navigate(['/']);
        cookieService.delete('token');
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
