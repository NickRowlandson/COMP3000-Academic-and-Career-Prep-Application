import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { User } from "../models/user";
import { AuthService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StaffService {

    private usersUrl = 'api/staff';  // URL to web app

    constructor(private http: Http,
                private authService: AuthService) { }

    getUsers(): Promise<User[]> {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.usersUrl, options)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    getUser(id: string) {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.usersUrl + '/' + id, options)
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
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http
          .post(this.usersUrl, user, options)
          .toPromise()
          .then(response => {
              return response.json();
          })
          .catch(this.handleError);
    }

    private put(user: User) {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      let url = `${this.usersUrl}/${user.staffID}`;
      console.log(user);
      return this.http
          .put(url, user, options)
          .toPromise()
          .then(() => user)
          .catch(this.handleError);
    }

    delete(user: User) {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      //headers.append('Content-Type', 'application/json');

      let url = `${this.usersUrl}/${user.userID}`;

      return this.http
          .delete(url, options)
          .toPromise()
          .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
