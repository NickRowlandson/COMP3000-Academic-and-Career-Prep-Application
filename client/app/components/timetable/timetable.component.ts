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
    events: any[];
    constructor(private studentService: StudentService, private route: ActivatedRoute) {

    }

    ngOnInit() {
 var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        console.log(currentUser);
         this.studentID = currentUser.studentID;
        console.log('studentId is '+ this.studentID);
    this.studentService.getEventsById(this.studentID).then(events =>
     {
        //  this.events = events;
        console.log(event);
        });
        ];
    }

    goBack() {
        window.history.back();
    }
}
