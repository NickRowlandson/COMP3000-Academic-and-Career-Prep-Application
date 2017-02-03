import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Student} from "../../models/student";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'student-list',
    templateUrl: './app/components/studentList/student-list.component.html',
    styleUrls: ['./app/components/studentList/student-list.component.css']
})

export class StudentListComponent implements OnInit {
    students: Student[] = [];

    constructor(
        private router: Router,
        private studentService: StudentService) {
    }

    ngOnInit() {
        this.studentService.getStudents()
            .then(students => this.students = students);
    }

    gotoView(student: Student) {
        let link = ['/view', student._id];
        this.router.navigate(link);
    }
}