import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Course } from "../models/course";
import { AuthService } from './authentication.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService {

    private courseUrl = 'api/course';  // URL to web app

    constructor(private http: Http,
                private authService: AuthService) { }

    getCourses(): Promise<Course[]> {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.courseUrl, options)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    getCourse(id: string) {
     // add authorization header with jwt token
     let headers = new Headers({ authorization: this.authService.token });
     let options = new RequestOptions({ headers: headers });

     return this.http.get(this.courseUrl + '/' + id, options)
         .toPromise()
         .then(response => response.json())
         .catch(this.handleError);
    }


    delete(course: Course) {
     // add authorization header with jwt token
     let headers = new Headers({ authorization: this.authService.token });
     let options = new RequestOptions({ headers: headers });

     //headers.append('Content-Type', 'application/json');

     let url = `${this.courseUrl}/${course.courseID}`;

     return this.http
         .delete(url, options)
         .toPromise()
         .catch(this.handleError);
    }



 save(course: Course): Promise<Course>  {
        if (course.courseID) {
            //return this.put(course);
        }
        return this.post(course);
    }

    private post(course: Course): Promise<Course> {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http
          .post(this.courseUrl, course, options)
          .toPromise()
          .then(response => response.json().data)
          .catch(this.handleError);
    }

    // private put(course: Course) {
    //   // add authorization header with jwt token
    //   let headers = new Headers({ authorization: this.authService.token });
    //   let options = new RequestOptions({ headers: headers });

    //   let url = `${this.courseUrl}/${course.courseID}`;
    //   return this.http
    //       .put(url, course, options)
    //       .toPromise()
    //       .then(() => course)
    //       .catch(this.handleError);
    // }

    private handleError(error: any) {
       console.log('An error occurred', error);
       return Promise.reject(error.message || error);
    }
}
