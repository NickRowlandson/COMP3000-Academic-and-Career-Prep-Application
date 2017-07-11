import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { CourseService } from "../../services/course.service";
import { StudentService } from "../../services/student.service";
declare var vis;

@Component({
    selector: 'course-selection',
    templateUrl: './app/components/course-selection/course-selection.component.html',
    styleUrls: ['./app/components/course-selection/course-selection.component.css']
})

export class CourseSelectionComponent implements OnInit {
    @Input() student: Student;
    courses: Course[];
    studentID: any;
    studentTimetable: [];

    constructor(private studentService: StudentService, private courseService: CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.studentID = params['id'];
            this.studentService.getStudent(this.studentID)
                .then(student => this.student = student);
        });
        this.getCourses();
        this.checkTimetable();
    }

    getCourses() {
        this.courseService
            .getCourses()
            .then(result => {
                if (result.error === 'error') {
                    this.courses = null;
                } else {
                    this.courses = result;
                }
            }).catch(error => error);
    }

    courseEnroll(course: Course, $event) {
        this.studentService
            .courseEnroll(this.studentID, course.courseID)
            .then(result => {
                this.checkTimetable();
                console.log("Enrolled");
            })
            .catch(error => error);
    }

    checkTimetable() {
        this.studentService
            .checkStudentTimetable(this.studentID)
            .then(result => {
                this.studentTimetable = result;
            })
            .catch(error => error);
    }

    removeCourse(course: Course, $event) {
        // this.studentService
        // .removeCourse()
        // .then(result => {
        //
        // })
        // .catch(error => error);
    }

    checkStatus() {
    }

    goBack() {
        window.history.back();
    }
}