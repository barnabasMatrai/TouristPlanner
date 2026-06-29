import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error-service';
import { handleRequest } from '../../../helpers/request.helper';
import { ErrorModal } from '../errors/error-modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ErrorModal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  errorService = inject(ErrorService);

  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    const username = this.usernameInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;

    if (!username || !password) {
      this.errorService.show('Please enter username and password');
      return;
    }

    this.errorService.clear();
    handleRequest(
      this.authService.login(username, password),
      () => this.router.navigate(['/dashboard']),
      () => {
        this.errorService.show('Invalid username or password');
      }
    );
  }
}
