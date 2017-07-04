import { Component, OnInit, NgZone } from '@angular/core';
import { Student } from "../../models/student";
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { AuthService } from "../../services/authentication.service";

declare var swal: any;

@Component({
    selector: 'student-manage',
    templateUrl: './app/components/student-manage/student-manage.component.html',
    styleUrls: ['./app/components/student-manage/student-manage.component.css']
})

export class StudentManageComponent implements OnInit {
    students: Student [];
    error: any;

    constructor(private router: Router, private ngZone: NgZone, private studentService: StudentService, private authService: AuthService) {

    }

    ngOnInit() {
        this.getStudents();
    }

    getStudents() {
      this.studentService
        .getStudents()
        .then(students => {
          if (students.status === "403") {
            this.students = null;
          } else {
            this.students = students;
          }
        })
        .catch(error => this.error = error);
    }

    addClient() {
      this.router.navigate(['/suitability']);
    }

    gotoEdit(student: Student, event: any) {
        this.router.navigate(['/student-edit', student.studentID]);
    }

    gotoCourseSelection(student: Student, event: any) {
      this.router.navigate(['/course-selection', student.studentID]);
    }

    addStudent() {
        this.router.navigate(['/student-edit', 'new']);
    }

    archiveAlert(student: Student, event: any) {
      swal({
          title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
          text: "Are you sure want to do this?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Archive it!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.archiveStudent(student, event);
        }
      });
    }

    archiveStudent(student, event): void {
      swal(
          'Sorry...',
          'This functionality is not yet available',
          'info'
      );
    }

    goBack() {
        window.history.back();
    }
}
