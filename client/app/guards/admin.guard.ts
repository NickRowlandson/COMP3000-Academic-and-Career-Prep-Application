import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;

        if (userType === "Admin") {
          return true;
        } else {
          // not logged in so redirect to login page
          this.router.navigate(['/dashboard']);
          return false;
        }
    }
}
