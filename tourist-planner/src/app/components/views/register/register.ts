import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error-service';
import { handleRequest } from '../../../helpers/request.helper';
import { ErrorModal } from '../errors/error-modal';
import { isValidEmail } from '../../../helpers/regex.helper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ErrorModal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  errorService = inject(ErrorService);

  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRepeat') passwordRepeatInput!: ElementRef<HTMLInputElement>;

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
      this.errorService.show('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      this.errorService.show('Please provide a valid email address');
      return;
    }

    if (password !== passwordRepeat) {
      this.errorService.show('Passwords do not match.');
      return;
    }

    handleRequest(
      this.authService.register(username, email, password),
      () => this.router.navigate(['/login']),
      () => {
        this.errorService.show('Registration failed. Username may already exist')
      }
    );
  }
}
