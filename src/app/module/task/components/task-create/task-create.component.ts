import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskEnum } from '../../models/TaskEnum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { Task } from '../../models/Task';

interface TaskOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-task-create',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() public taskId: string | null = null;

  public taskForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    if (this.taskId === null) {
      this.taskForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],
        dueAt: [null, Validators.required],
      });
    } else {
      this.getById();
    }
  }

  public getById(): void {
    this.taskService.getById(this.taskId + '').subscribe({
      next: (task: Task) => {
        this.taskForm = this.formBuilder.group({
          title: [task.title, null],
          description: [task.description, null],
          status: [task.status, null],
          dueAt: [task.dueAt, null],
        });
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  private taskConvert = {
    [TaskEnum.PENDING]: 'Pendente',
    [TaskEnum.IN_PROGRESS]: 'Em andamento',
    [TaskEnum.COMPLETED]: 'Concluída',
  };

  public taskOptions: TaskOption[] = Object.values(TaskEnum).map((value) => {
    const label = this.taskConvert[value];
    return { value, label };
  });

  public onSubmitForm() {
    if (this.taskForm.valid) {
      this.onSubmit.emit(this.taskForm.value);
    }
  }
}
