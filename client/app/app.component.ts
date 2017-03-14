import {Component} from '@angular/core';

@Component({
    selector:'my-app',
    templateUrl: './app/app.html'
})

export class AppComponent {
    title = 'Academic and Career Preparation';
    currentUser: any;
    loggedIn: any;

    getCurrentUser() {
      if (localStorage.getItem('currentUser')) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
        console.log(this.currentUser);
        this.loggedIn = true;
      }
    }
}
