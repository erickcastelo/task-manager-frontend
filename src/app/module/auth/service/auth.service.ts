import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../base.service';
import { Auth } from '../models/Auth';
import { Observable } from 'rxjs';
import { User } from '../../login/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<Auth> {
  constructor(protected override http: HttpClient) {
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
}
