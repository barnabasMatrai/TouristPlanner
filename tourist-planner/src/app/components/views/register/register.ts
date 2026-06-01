import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRepeat') passwordRepeatInput!: ElementRef<HTMLInputElement>;

  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onRegister() {
    const username = this.usernameInput.nativeElement.value.trim();
    const email = this.emailInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;
    const passwordRepeat = this.passwordRepeatInput.nativeElement.value;

    if (!username || !email || !password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (password !== passwordRepeat) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.errorMessage = '';
    this.authService.register(username, email, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.errorMessage = 'Registration failed. Username may already exist.';
      },
    });
  }
}
