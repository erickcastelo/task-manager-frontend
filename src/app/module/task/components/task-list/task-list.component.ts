import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Task } from '../../models/Task';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PageEventCustom } from '../../pages/task-list-page/task-list-page.component';
import { StatusNamePipe } from '../../pipes/status-name.pipe';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    StatusNamePipe,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() public data: Task[] = [];
  @Input() public totalItems: number = 0;
  @Input() public pageSize: number = 5;
  @Input() public displayedColumns: string[] = [];

  @Output() onPageChange = new EventEmitter<PageEventCustom>();

  sortDirection: 'asc' | 'desc' | '' = '';

  toggleSort(): void {
    // alterna entre asc, desc e '' (sem ordenação)
    if (this.sortDirection === '') {
      this.sortDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = '';
    }

    const sort = this.sortDirection ? `dueAt,${this.sortDirection}` : null;
    this.onPageChange.emit({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.totalItems,
      sort,
    });
  }

  public onPage(event: PageEvent): void {
    this.onPageChange.emit({ ...event, sort: this.sortDirection });
  }
}
