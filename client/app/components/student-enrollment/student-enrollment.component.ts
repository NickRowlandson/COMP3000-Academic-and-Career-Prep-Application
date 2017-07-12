import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { CourseService } from "../../services/course.service";
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'course-selection',
    templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
    styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
})

export class StudentEnrollmentComponent implements OnInit {
    students: Student[];
    courseID: any;
    courseName: any;
    studentTimetables: any[];

    constructor(private studentService: StudentService, private courseService: CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.courseID = params['id'];
            this.courseName = params['name'];
        });
        this.getStudents();
    }

    getStudents() {
        this.studentService
            .getStudents()
            .then(result => {
                if (result.error === 'error') {
                    this.students = null;
                } else {
                    this.students = result;
                    this.getTimetables();
                }
            }).catch(error => error);
    }

    getTimetables() {
        this.studentService
            .getTimetables()
            .then(result => {
              this.studentTimetables = result;
              this.compareTimetables();
            })
            .catch(error => error);
    }

    compareTimetables() {
      for (let student of this.students) {
        var timetable = this.studentTimetables.filter(x => x.studentID === student.studentID);
        for (let item of timetable) {
          var itemCourseID = item.courseID.toString();
          if (itemCourseID === this.courseID) {
            student.enrolled = true;
          } else {
            student.enrolled = false;
          }
        }
      }
    }

    checkEnrolled(student: Student, enrolled) {
      if (enrolled) {
        this.drop(student);
      } else {
        this.enroll(student);
      }
    }

    enroll(student: Student) {
      this.studentService
          .courseEnroll(student.studentID, this.courseID)
          .then(result => {
              this.getTimetables();
          })
          .catch(error => error);
    }

    drop(student: Student) {
      this.studentService
          .courseDrop(student.studentID, this.courseID)
          .then(result => {
              this.getTimetables();
          })
          .catch(error => error);
    }

    checkStatus() {
    }

    goBack() {
        window.history.back();
    }
}
