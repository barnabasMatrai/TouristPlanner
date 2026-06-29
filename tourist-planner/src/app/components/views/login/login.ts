import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { handleRequest } from '../../../helpers/request.helper';
import { ErrorMessage } from '../errors/error-message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;

  errorMessage = signal<string>('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    const username = this.usernameInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;

    if (!username || !password) {
      this.errorMessage.set('Please enter username and password.');
      return;
    }

    this.errorMessage.set('');
    handleRequest(
      this.authService.login(username, password),
      () => this.router.navigate(['/dashboard']),
      () => {
        this.errorMessage.set('Invalid username or password.');
      }
    );
  }
}
