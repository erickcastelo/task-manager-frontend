import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../module/login/models/User';
import { AuthSubject } from '../../../module/auth/service/auth.subject';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private authSubject: AuthSubject) {}

  public user: User | null = null;

  ngOnInit(): void {
    this.authSubject.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
