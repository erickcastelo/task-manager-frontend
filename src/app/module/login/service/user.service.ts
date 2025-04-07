import { Injectable } from '@angular/core';
import { BaseService } from '../../../base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  constructor(protected override http: HttpClient) {
    super(http, 'users');
  }
}
