import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './authentication.service';
import { Student } from "../models/student";
import { Course } from "../models/course";

@Injectable()
export class StudentService {

    private studentsUrl = 'api/students';  // URL to web api

    constructor(private http: Http, private authService: AuthService) { }

    getStudents(): Promise<Student[]> {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.studentsUrl, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getStudent(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.studentsUrl + '/' + id, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(student: Student): Promise<Student>  {
        return this.post(student);
    }

    private post(student: Student): Promise<Student> {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post(this.studentsUrl, student, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(student: Student) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `${this.studentsUrl}/${student.studentID}`;

        return this.http
            .put(url, student, options)
            .toPromise()
            .then(() => student)
            .catch(this.handleError);
    }

    delete(student: Student) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `${this.studentsUrl}/${student.userID}`;

        return this.http
            .delete(url, options)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private courseEnroll(studentID, courseID): Promise<Student> {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `${this.studentsUrl}/${studentID}/${courseID}`;

        return this.http
            .post(url, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    removeCourse(student, course) {

    }
}
