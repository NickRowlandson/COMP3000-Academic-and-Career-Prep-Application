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

    getAuthLevel(token: string) {
      return this.http.get('api/users/' + token)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({
          'Content-Type': 'application/json'});
        var credentials = JSON.stringify({ username: username, password: password });
        return this.http.post('/api/auth', credentials, {headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json().body && response.json().body.token;
                if (token) {
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

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
