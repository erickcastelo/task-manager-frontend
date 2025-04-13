import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './module/auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'task-manager-frontend';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');

    this.authService.init(token).subscribe({
      next: (isValid) => {
        if (isValid && this.router.url === '/') {
          this.router.navigate(['/task/list']);
        } else {
          this.cookieService.delete('token');
        }
      },
      error: (error) => {
        this.cookieService.delete('token');
      },
    });
  }
}
