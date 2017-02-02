import {Injectable} from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Student} from "../models/student";

@Injectable()
export class StudentService {

    private studentsUrl = 'api/students';  // URL to web api

    constructor(private http: Http) { }

    getStudents(): Promise<Student[]> {
        return this.http.get(this.studentsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getStudent(id: string) {
        return this.http.get(this.studentsUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(student: Student): Promise<Student>  {
        if (student._id) {
            return this.put(student);
        }
        return this.post(student);
    }

    private post(student: Student): Promise<Student> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post(this.studentsUrl, JSON.stringify(student), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(student: Student) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.studentsUrl}/${student._id}`;

        return this.http
            .put(url, JSON.stringify(student), {headers: headers})
            .toPromise()
            .then(() => student)
            .catch(this.handleError);
    }

    delete(student: Student) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.studentsUrl}/${student._id}`;

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
