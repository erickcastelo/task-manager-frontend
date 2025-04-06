import { Component } from '@angular/core';
import { TaskCreateComponent } from '../../components/task-create/task-create.component';

@Component({
  selector: 'app-task-create-page',
  imports: [TaskCreateComponent],
  templateUrl: './task-create-page.component.html',
  styleUrl: './task-create-page.component.scss',
})
export class TaskCreatePageComponent {}
