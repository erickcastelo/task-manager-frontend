import { Component, OnInit } from '@angular/core';
import { TaskCreateComponent } from '../../components/task-create/task-create.component';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/Task';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-create-page',
  imports: [TaskCreateComponent],
  templateUrl: './task-create-page.component.html',
  styleUrl: './task-create-page.component.scss',
})
export class TaskCreatePageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public taskId: string | null = null;

  private createTask(task: Task): void {
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

  private updateTask(task: Task): void {
    this.taskService.update(task, Number(this.taskId)).subscribe({
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

  public beforeSave(task: Task): void {
    if (this.taskId === null) {
      this.createTask(task);
    } else {
      this.updateTask(task);
    }
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
  }
}
