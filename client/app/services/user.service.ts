import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { User } from "../models/user";
import { AuthService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = 'api/users';  // URL to web app

    constructor(private http: Http,
                private authService: AuthService) { }

    getUsers(): Promise<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.usersUrl, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getUser(id: string) {
        return this.http.get(this.usersUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(user: User): Promise<User>  {
        if (user.staffID) {
            return this.put(user);
        }
        return this.post(user);
    }

    private post(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.usersUrl, JSON.stringify(user), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user.staffID}`;

        return this.http
            .put(url, JSON.stringify(user), {headers: headers})
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    delete(user: User) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.usersUrl}/${user.staffID}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
