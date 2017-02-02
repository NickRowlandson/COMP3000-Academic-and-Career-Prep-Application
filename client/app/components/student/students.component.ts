import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {Student} from "../../models/student";
import { Router } from '@angular/router';

@Component({
    selector: 'my-heroes',
    templateUrl: './app/components/heroes/students.component.html'
})

export class StudentsComponent implements OnInit {

    students: Student[];
    selectedStudent: Student;
    error: any;

    constructor(
        private router: Router,
        private studentService: StudentService) { }
    getHeroes() {
        this.studentService.getStudents().then(students => this.students = students);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(student: Student) { this.selectedStudent = student; }

    gotoDetail() {
        this.router.navigate(['/detail', this.selectedStudent._id]);
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
