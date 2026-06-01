import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;

  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    const username = this.usernameInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;

    if (!username || !password) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    this.errorMessage = '';
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
