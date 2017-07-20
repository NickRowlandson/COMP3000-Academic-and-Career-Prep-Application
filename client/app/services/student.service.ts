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

    courseEnroll(studentID, courseID, instructorID) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `api/enroll/${studentID}/${courseID}/${instructorID}`;

        return this.http
            .post(url, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    courseDrop(studentID, courseID) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `api/drop/${studentID}/${courseID}`;

        return this.http
            .delete(url, options)
            .toPromise()
            .catch(this.handleError);
    }

    getTimetables() {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      let url = `api/timetables`;

      return this.http.get(url, options)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    getTimetablesByCourseId(courseID) {
          // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `api/timetables-course-id/${courseID}`;

        return this.http.get(url, options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getEventsById(studentID) {
        console.log(studentID);
          // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `api/timetable/${studentID}`;
        return this.http.get(url, options).toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    //     console.log('hey im printing res');
    // console.log(response.json())})
    //
        // .then(res => <any[]> res.json().data)
        //             .then(data => { return data; });
    }

    getStudentsById(timetables) {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      let url = `api/get-students-id`;

      return this.http.post(url, timetables, options)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    saveNewNote(caseNote, studentID) {
      var caseNoteObject = { caseNote: caseNote };
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });
        let url = `api/caseNotes/${studentID}`;

        return this.http
            .post(url, caseNoteObject, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getNotes(studentID) {
      // add authorization header with jwt token
      let headers = new Headers({ authorization: this.authService.token });
      let options = new RequestOptions({ headers: headers });

      let url = `api/caseNotes/${studentID}`;

      return this.http.get(url, options)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    insertAttendance(attendance) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `api/attendance`;

        return this.http
            .post(url, attendance, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
}
