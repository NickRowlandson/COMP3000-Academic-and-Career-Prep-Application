import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/student";
import { Router } from '@angular/router';

@Component({
    selector: 'student-manage',
    templateUrl: './app/components/studentManage/student-manage.component.html'
})

export class StudentManageComponent implements OnInit {

    students: Student[];
    selectedStudent: Student;
    error: any;

    constructor(
        private router: Router,
        private studentService: StudentService) { }
    getStudents() {
        this.studentService.getStudents().then(students => this.students = students);
    }
    ngOnInit() {
        this.getStudents();
    }
    onSelect(student: Student) { this.selectedStudent = student; }

    gotoDetail(student: Student, event: any) {
        this.router.navigate(['/detail', student._id]);
    }

    addStudent() {
        this.selectedStudent = null;
        this.router.navigate(['/detail', 'new']);
    }

    deleteStudent(student: Student, event: any) {
        event.stopPropagation();
        this.studentService
            .delete(student)
            .then(res => {
                this.students = this.students.filter(h => h !== student);
                if (this.selectedStudent === student) { this.selectedStudent = null; }
            })
            .catch(error => this.error = error);
    }
}