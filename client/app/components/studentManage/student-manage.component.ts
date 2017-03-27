import { Component, OnInit } from '@angular/core';
import { Student } from "../../models/student";
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { AuthService } from "../../services/authentication.service";

@Component({
    selector: 'student-manage',
    templateUrl: './app/components/studentManage/student-manage.component.html',
    styleUrls: ['./app/components/studentManage/student-manage.component.css']
})


export class StudentManageComponent implements OnInit {
    students = [];
    error: any;

    constructor(private router: Router, private studentService: StudentService, private authService: AuthService) {

    }

    ngOnInit() {
        this.getData();
    }

    getData() {
      this.studentService.getStudents()
      .then(data =>
        this.getStudents(data)
      );
    }

    getStudents(data) {
      for (let student of data) {
        this.authService.getAuthLevel(student.userID)
        .then(data =>
          this.addToTable(data.authLevel, student)
        );
      }
    }
    
    addClient() {
      this.router.navigate(['/suitability']);
    }

    addToTable(authLevel, student) {
      if (authLevel === 'student') {
        this.students.push(student);
      }
    }

    gotoEdit(student: Student, event: any) {
        this.router.navigate(['/studentEdit', student.studentID]);
    }

    addStudent() {
        this.router.navigate(['/studentEdit', 'new']);
    }

    deleteStudent(student: Student, event: any) {
        event.stopPropagation();
        this.studentService
            .delete(student)
            .then(res => {
                this.students = this.students.filter(h => h !== student);
            })
            .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
