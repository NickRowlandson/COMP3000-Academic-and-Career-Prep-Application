import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
          return true;
        } else {
          // not logged in so redirect to login page
          this.router.navigate(['/login']);
          return false;
        }
    }
}
