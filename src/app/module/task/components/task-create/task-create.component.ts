import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { CommonModule, JsonPipe } from '@angular/common';

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

  public taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      dueAt: [null, Validators.required],
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
