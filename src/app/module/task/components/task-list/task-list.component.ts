import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Task } from '../../models/Task';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PageEventCustom } from '../../pages/task-list-page/task-list-page.component';
import { StatusNamePipe } from '../../pipes/status-name.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../../../common/confim-dialog/confim-dialog.component';

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

  @Output() public onPageChange = new EventEmitter<PageEventCustom>();
  @Output() public onEdit = new EventEmitter<Task>();
  @Output() public onDelete = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {}

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

  public edit(task: Task): void {
    this.onEdit.emit(task);
  }

  public delete(task: Task): void {
    console.log('para paiu');

    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja excluir esta tarefa?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete.emit(task);
      }
    });
  }
}
