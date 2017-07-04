import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'timetable',
    templateUrl: './app/components/timetable/timetable.component.html',
    styleUrls: ['./app/components/timetable/timetable.component.css']
})

export class TimetableComponent implements OnInit {
    @Input() student: Student;
    studentID: any;

    constructor(private studentService: StudentService, private route: ActivatedRoute) {

    }

    ngOnInit() {

    }

    goBack() {
        window.history.back();
    }
}
