import { Component } from '@angular/core';
import { AuthService } from './services/authentication.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent {
    title = 'Academic and Career Preparation';
    private currentUser: any = null;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loggedUser.subscribe(
            data => {
                if (data) {
                    var username = data.replace(/['"]+/g, '');
                    this.currentUser = username;
                } else {
                    this.currentUser = null;
                }
            },
            err => {
                console.log(err);
            }
        );
    }

}
