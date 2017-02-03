import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {Student} from "../../models/student";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    students: Student[] = [];

    constructor(private router: Router, private studentService: StudentService) {

    }

    ngOnInit() {
        this.studentService.getStudents()
            .then(students => this.students = students);
    }

    gotoDetail(student: Student) {
        let link = ['/detail', student._id];
        this.router.navigate(link);
    }
}
