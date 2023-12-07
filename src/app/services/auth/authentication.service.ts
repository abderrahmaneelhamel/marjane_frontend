import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/v3/admins';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/auth`, body);
  }

  handleLoginSuccess(user: any) {
    this.userService.setUser(user);

    if (user.name === 'admin') {
      this.router.navigate(['/AdminDashboard']);
    } else if (user.name === 'responsable') {
      this.router.navigate(['/ResponsableDashboard']);
    } else {
      console.error('Unknown name:', user.name);
    }

    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/login']);

    this.isLoggedInSubject.next(false);
  }

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
