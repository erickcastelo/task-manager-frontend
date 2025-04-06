import { Component } from '@angular/core';
import { TaskCreateComponent } from '../../components/task-create/task-create.component';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-create-page',
  imports: [TaskCreateComponent],
  templateUrl: './task-create-page.component.html',
  styleUrl: './task-create-page.component.scss',
})
export class TaskCreatePageComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  public createTask(task: Task) {
    this.taskService.create(task).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['task/list']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
