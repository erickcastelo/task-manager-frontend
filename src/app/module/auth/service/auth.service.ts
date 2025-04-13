import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../base.service';
import { Auth } from '../models/Auth';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../../login/models/User';
import { AuthSubject } from './auth.subject';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<Auth> {
  constructor(
    protected override http: HttpClient,
    private authSubject: AuthSubject
  ) {
    super(http, 'auth');
  }

  public login(auth: Auth): Observable<string> {
    return this.http.post(`${this.fullUrl}/login`, auth, {
      responseType: 'text' as const,
    });
  }

  public me(token: string): Observable<User> {
    return this.http.get<User>(`${this.fullUrl}/me/${token}`);
  }

  public init(token: string): Observable<boolean> {
    if (!token) return of(false);

    return this.me(token).pipe(
      map((user: User) => {
        if (user) {
          this.authSubject.setUser(user);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }
}
