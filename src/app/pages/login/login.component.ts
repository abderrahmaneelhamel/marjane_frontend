// Import necessary modules and services
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Declare variables for email and password
  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  // Function to handle login
  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.handleLoginSuccess(response);

      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
