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
        this.getCourses();
    }
    getCourses() {
        this.CourseService
            .getCourses()
            .then(result => {
                if (result.status === "403") {
                    this.courses = null;
                } else {
                    this.courses = result;
                    console.log(this.courses);
                }
            })
            .catch(error => this.error = error);
    }

  deleteCourse(course: Course, event: any) {

        event.stopPropagation();
        this.CourseService
          .delete(course)
          .then(res => {
              console.log(res);
              console.log(course);
              this.courses = this.courses.filter(h => h !== course);
          })
          .catch(error => this.error = error);
    }

    gotoEdit(course: Course, event: any) {
        this.router.navigate(['/course-edit', course.courseID]);
    }

    addCourse() {
        this.router.navigate(['/course-edit', 'new']);
    }


    goBack() {
        window.history.back();
    }
}
