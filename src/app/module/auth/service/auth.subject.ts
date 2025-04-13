import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../login/models/User';

@Injectable({ providedIn: 'root' })
export class AuthSubject {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {}

  public setUser(user: User) {
    this.userSubject.next(user);
  }

  public getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  public getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  public clearUser() {
    this.userSubject.next(null);
  }
}
