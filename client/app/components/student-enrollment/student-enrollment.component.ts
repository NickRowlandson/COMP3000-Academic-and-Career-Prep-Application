import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { CourseService } from "../../services/course.service";
import { StudentService } from "../../services/student.service";
declare var swal: any;

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
    // console.log(this.courseID)
        for (let student of this.students) {
            var timetable = this.studentTimetables.filter(x => x.userID === student.userID);
            console.log(timetable);
            for (let item of timetable) {
                var itemCourseID = item.courseID.toString();
                // console.log('current courseID: '+ itemCourseID);
                if (itemCourseID === this.courseID) {
                  console.log('course:'+this.courseID+' has been matched for student '+student.userID)
                    student.enrolled = true;
                    console.log('student: '+student.userID+' status to true'+student.enrolled )
                } else {
                    student.enrolled = false;
                      console.log('student: '+student.userID+' status to false'+student.enrolled)
                }

            }
        }
        console.log(this.students);
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
        this.studentService
            .courseEnroll(student.userID, this.courseID,  this.instructorID)
            .then(result => {
                student.enrolled = true;
            })
            .catch(error => error);
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
