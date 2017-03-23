import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    public token: string;
    public loggedUser : ReplaySubject<any> = new ReplaySubject(1);

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        if (localStorage.getItem('currentUser')) {
          var user = currentUser.username;
          this.loggedUser.next(JSON.stringify(user));
        }
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({
          'Content-Type': 'application/json'});
        var credentials = JSON.stringify({ username: username, password: password });
        return this.http.post('/api/auth', credentials, {headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log("THIS! " + response.json().body);
                let token = response.json().body && response.json().body.token;
                if (token) {
                    console.log("Login Success!");
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    var user = JSON.parse(localStorage.getItem('currentUser')).username;
                    this.loggedUser.next(JSON.stringify(user));

                    // return true to indicate successful login
                    return true;
                } else {
                     console.log("Failed to login");
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.loggedUser.next(null);
    }
}
