import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'attendanceList',
    templateUrl: './app/components/attendance-list/attendance-list.component.html',
    styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
})

export class AttendanceListComponent implements OnInit {
    data: any;
    attendanceView: boolean = false;
    attendanceCourse: any;
    attendanceStudents: any;
    timetables: any;

    constructor(private router: Router, private CourseService: CourseService, private StudentService: StudentService) {

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
                var isEmpty = (result || []).length === 0;
                if (isEmpty) {
                    this.data = null;
                } else {
                    this.data = result;
                }
            })
            .catch(error => console.log(error));
    }

    doAttendance(course: Course) {
      this.StudentService
          .getTimetablesByCourseId(course.courseID)
          .then(result => {
              var isEmpty = (result || []).length === 0;
              if (isEmpty) {
                  this.timetables = null;
              } else {
                  this.timetables = result
                  this.getStudentsById(this.timetables);
              }
          })
          .catch(error => console.log(error));

      this.attendanceCourse = course.courseName;
      this.attendanceView = true;
    }

    getStudentsById(timetables) {
      this.StudentService
          .getStudentsById(timetables)
          .then(result => {
              var isEmpty = (result || []).length === 0;
              if (isEmpty) {
                  this.attendanceStudents = null;
              } else {
                  this.attendanceStudents = result
              }
          })
          .catch(error => console.log(error));
    }

    goBack() {
        window.history.back();
    }
}
