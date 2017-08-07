import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { CourseService } from "../../services/course.service";
import { StudentService } from "../../services/student.service";
declare var swal: any;
declare var moment: any;

@Component({
    selector: 'course-selection',
    templateUrl: './app/components/student-enrollment/student-enrollment.component.html',
    styleUrls: ['./app/components/student-enrollment/student-enrollment.component.css']
})

export class StudentEnrollmentComponent implements OnInit {
    students: Student[];
    courseID: any;
    instructorID: any;
    courseName: any;
    studentTimetables: any[];
    loading: boolean = true;
    tempTimetableArry: any[] = [];

    constructor(private studentService: StudentService, private courseService: CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.courseID = params['courseID'];
            this.instructorID = params['instructorID'];
            this.courseName = params['courseName'];
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
                    for (let student of this.students) {
                      student.fullName = student.firstName + " " + student.lastName;
                    }
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
            var timetable = this.studentTimetables.filter(x => x.userID === student.userID);
            for (let item of timetable) {
                var itemCourseID = item.courseID.toString();
                if (itemCourseID === this.courseID) {
                    student.enrolled = true;
                }
            }
        }
        this.loading = false;
    }

    checkEnrolled(student: Student) {
        if (student.enrolled) {
            swal({
                title: 'Remove ' + student.firstName + ' ' + student.lastName + ' from ' + this.courseName + '?',
                text: "",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove!'
            }).then(isConfirm => {
                if (isConfirm) {
                    this.drop(student);
                }
            }).catch(error => {
                //console.log("Canceled");
            });
        } else {
            this.enroll(student);
        }
    }

    enroll(student: Student) {
      var startDate = moment(student.studentStartDate, "DDD MMM YYYY h:mm:ss LT").isValid();
      var endDate = moment(student.studentEndDate, "DDD MMM YYYY h:mm:ss LT").isValid();
        if (startDate && endDate) {
          this.studentService
              .courseEnroll(student.userID, student.studentStartDate, student.studentEndDate, this.courseID, this.instructorID)
              .then(result => {
                  student.enrolled = true;
                  swal(
                      this.courseName,
                      '' + student.firstName + ' ' + student.lastName + ' has been succesfully enrolled.',
                      'success'
                  );
              })
              .catch(error => error);
        } else {
          swal(
              'Whoops',
              'Please input a valid start and end date for the student.',
              'warning'
          );
        }
    }

    drop(student: Student) {
        this.studentService
            .courseDrop(student.userID, this.courseID)
            .then(result => {
                student.enrolled = false;
            })
            .catch(error => error);
    }

    checkStatus() {
    }

    goBack() {
        window.history.back();
    }
}
