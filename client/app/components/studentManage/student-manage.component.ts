import { Component, OnInit } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";
import { Router } from '@angular/router';

@Component({
    selector: 'student-manage',
    templateUrl: './app/components/studentManage/student-manage.component.html',
    styleUrls: ['./app/components/studentManage/student-manage.component.css']
})


export class StudentManageComponent implements OnInit {
    students: Student[];
    error: any;

    constructor(private router: Router, private studentService: StudentService) {

    }

    getStudents() {
        this.studentService.getStudents().then(students => this.students = students);
    }
    ngOnInit() {
        this.getStudents();
    }

    gotoEdit(student: Student, event: any) {
        this.router.navigate(['/studentEdit', student._id]);
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
