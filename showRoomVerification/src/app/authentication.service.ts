import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthRlService } from './auth-rl.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private authRlService: AuthRlService,
    private userService: UserService
  ) {}

  login(email: string, password: string): Observable<any> {
    const adminMail = 'admin@gmail.com';
    const adminPassword = 'Tharini@02';
    if(email=== adminMail && adminPassword=== password){
      sessionStorage.setItem('isAdmin', 'true');
    }
    // Example: Call your service to post data
    return this.authRlService.loginPost({ email, password }).pipe(
      tap((response: any) => {
        // Store user data in sessionStorage upon successful login
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        console.log(sessionStorage);
      })
    );
  }

  logout(): void {
    // Clear session data and redirect to login page
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/signin-signup']);
  }

  isLoggedIn(): boolean {
    // Check if user is logged in by verifying session data
    return sessionStorage.getItem('currentUser') !== null;
  }

  isAdmin(): boolean {
    // Check if the logged-in user is an admin
    return sessionStorage.getItem('isAdmin') === 'true';
  }
}
