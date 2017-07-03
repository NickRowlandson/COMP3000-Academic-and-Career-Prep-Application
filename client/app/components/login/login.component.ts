import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
declare var swal: any;

@Component({
    selector: 'login',
    templateUrl: './app/components/login/login.component.html',
    styleUrls: ['./app/components/login/login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService
        .login(this.model.username, this.model.password)
        .then(result => {
          if (result === true) {
              this.router.navigate(['/']);
          } else {
              this.error = 'Username or password is incorrect';
              this.loading = false;
          }
        }).catch(error => console.log(error));
      }
}
