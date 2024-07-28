import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page
      return this.router.parseUrl('/signin-signup');
    }
  }
}
