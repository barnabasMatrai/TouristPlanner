import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],  
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  

constructor(private router: Router) {}

  onLogin() {
    // for now just navigate directly, later you'll check username/password here
    this.router.navigate(['/dashboard']);
  }

}