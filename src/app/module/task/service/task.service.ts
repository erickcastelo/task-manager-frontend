import { Injectable } from '@angular/core';
import { BaseService } from '../../../base.service';
import { Task } from '../models/Task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService<Task> {
  constructor(protected override http: HttpClient) {
    super(http, 'tasks');
  }
}
