import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
@Component({
    selector: 'courseManage',
    templateUrl: './app/components/course-manage/course-manage.component.html',
    styleUrls: ['./app/components/course-manage/course-manage.component.css']
})

export class CourseManageComponent implements OnInit {
    courses: Course[];
    error: any;

    constructor(private router: Router, private CourseService: CourseService) {

    }

    ngOnInit() {
        this.getCourse();
    }
    getCourse() {
        this.CourseService
            .getCourse()
            .then(result => {
                if (result.status === "403") {
                    this.courses = null;
                } else {
                    this.courses = result;
                    console.log('hello world');
                    console.log(this.courses);
                }
            })
            .catch(error => this.error = error);
    }
    goBack() {
        window.history.back();
    }
}
