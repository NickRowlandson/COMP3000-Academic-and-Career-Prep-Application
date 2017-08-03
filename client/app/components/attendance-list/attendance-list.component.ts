import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";
declare var swal: any;

@Component({
    selector: 'attendanceList',
    templateUrl: './app/components/attendance-list/attendance-list.component.html',
    styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
})

export class AttendanceListComponent implements OnInit {
    data: any;
    date: any;
    courseID: any;
    attendanceView: boolean = false;
    loading: boolean = false;
    attendanceCourse: any;
    attendanceStudents: any;
    timetables: any;
    attendance: any;
    absentStudents = [];

    constructor(private router: Router, private CourseService: CourseService, private StudentService: StudentService) {
      this.date = new Date();
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
                    console.log(result);
                    this.data = null;
                } else {
                    this.data = result;
                }
            })
            .catch(error => console.log(error));
    }

    doAttendance(course: Course) {
      this.loading = true;
      this.courseID = course.courseID;
      this.StudentService
          .getTimetablesByCourseId(course.courseID)
          .then(result => {
              var isEmpty = (result || []).length === 0;
              if (isEmpty) {
                  this.timetables = null;
                  this.attendanceStudents = null;
                  this.loading = false;
              } else {
                  this.timetables = result;
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
                  this.attendanceStudents = result;
                  this.loading = false;
              }
          })
          .catch(error => console.log(error));
    }

    // markAbsent(student: Student) {
    //   if (student.absent) {
    //     student.absent = false;
    //     var index = this.absentStudents.indexOf(student.studentID);
    //     this.absentStudents.splice(index, 1);
    //   } else {
    //     student.absent = true;
    //     this.absentStudents.push(student.studentID);
    //   }
    //   console.log(this.absentStudents);
    // }

    submitAttendance() {
      var count = 0;
      for (let student of this.attendanceStudents) {
        if (student.attendanceValue) {
          count++;
        }
      }

      if (count === this.attendanceStudents.length) {
        swal({
            title: 'Submit Attendance?',
            text: "You won't be able to revert this!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!'
        }).then(isConfirm => {
          if (isConfirm) {
            this.attendance = {
              students: this.attendanceStudents,
              courseID: this.courseID,
              date: this.date
            };
            this.StudentService
                .insertAttendance(this.attendance)
                .then(result => {
                  swal(
                      'Attendance submitted!',
                      '',
                      'success'
                  );
                  this.attendanceView = false;
                })
                .catch(error => console.log(error));
          }
        }).catch(error => {
          //console.log("Canceled");
        });
      } else {
        swal(
            'Attendance Incomplete',
            'Please enter attendance for all students',
            'warning'
        );
      }

    }

    goBack() {
        window.history.back();
    }
}
