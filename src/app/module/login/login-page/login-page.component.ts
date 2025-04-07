import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../service/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  public createUserForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordsMatchValidator.bind(this)],
      }
    );
  }

  private passwordsMatchValidator(
    formGroup: AbstractControl
  ): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }

    return null;
  }

  public onSubmitCreateUserForm() {
    if (this.createUserForm.valid) {
      this.createUser(this.createUserForm.value);
    }
  }

  private createUser(user: User) {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    } as User;
    this.userService.create(newUser).subscribe({
      next: (result) => {
        if (result) {
          console.log('user', result);

          // this.router.navigate(['task/list']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
