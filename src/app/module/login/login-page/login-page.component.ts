import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../service/user.service';
import { User } from '../models/User';
import { Auth } from '../../auth/models/Auth';
import { AuthService } from '../../auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
  public loginForm!: FormGroup;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initilForms();
  }

  private initilForms(): void {
    this.createUserForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordsMatchValidator.bind(this)],
      }
    );

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
          this.createUserForm.reset();
          this.tabGroup.selectedIndex = 0;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public onSubmitLoginForm() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    }
  }

  private login(auth: Auth) {
    this.authService.login(auth).subscribe({
      next: (token) => {
        if (token) {
          this.cookieService.set('token', token);
          this.router.navigate(['task/list']);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
