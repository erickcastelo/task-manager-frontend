import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../service/task.service';
import { Page } from '../../../../common/page/Page';
import { Task } from '../../models/Task';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

export interface PageEventCustom extends PageEvent {
  sort: string | null;
}

@Component({
  selector: 'app-task-list-page',
  imports: [TaskListComponent],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss',
})
export class TaskListPageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public totalItems = 0;
  public pageIndex = 0;
  public pageSize = 5;
  private sort = '';

  public displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'dueAt',
    'edit',
    'delete',
  ];

  public data: Task[] = [];

  ngOnInit(): void {
    this.listTasks();
  }

  private listTasks(): void {
    this.taskService.addParameter('page', this.pageIndex.toString());
    this.taskService.addParameter('size', this.pageSize.toString());
    this.sort ? this.taskService.addParameter('sort', this.sort) : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.taskService.parameters,
      queryParamsHandling: 'merge',
    });

    this.taskService.getAll().subscribe({
      next: (result: Page<Task>) => {
        this.data = result.content;
        this.totalItems = result.totalElements;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  public onPageChange(event: PageEventCustom): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sort = event.sort || '';

    this.listTasks();
  }

  public onEdit(task: Task) {
    this.router.navigate(['task/edit', task.id]);
  }

  public onDelete(task: Task) {
    // Lógica de exclusão
    console.log('Excluindo task:', task);
  }
}
