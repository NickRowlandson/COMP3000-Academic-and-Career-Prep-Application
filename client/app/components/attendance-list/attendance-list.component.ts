import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";

@Component({
    selector: 'attendanceList',
    templateUrl: './app/components/attendance-list/attendance-list.component.html',
    styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
})

export class AttendanceListComponent implements OnInit {
    data: any;
    attendanceView: boolean = false;

    constructor(private router: Router, private CourseService: CourseService) {

    }

    ngOnInit() {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var userID = currentUser.userID;
      this.getCourses(userID);
    }

    getCourses(instructorID) {
        this.CourseService
            .getInstructorCourses(instructorID)
            .then(result => {
                if (result.status === "403") {
                    this.data = null;
                } else {
                    this.data = result;
                }
            })
            .catch(error => console.log(error));
    }

    goBack() {
        window.history.back();
    }
}
