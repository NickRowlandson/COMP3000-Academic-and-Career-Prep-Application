import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
declare var swal: any;

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

    deleteAlert(course: Course, event: any) {
        swal({
            title: 'Delete course (' + course.courseName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
          if (isConfirm) {
            this.deleteCourse(course, event);
          }
        }).catch(error => {
          //console.log("Canceled");
        });
    }

    deleteCourse(course: Course, event: any) {
        event.stopPropagation();
        this.CourseService
          .delete(course)
          .then(res => {
              this.courses = this.courses.filter(h => h !== course);
              swal(
                  'Deleted!',
                  'Course record has been deleted.',
                  'success'
              );
          })
          .catch(error => this.error = error);
    }

    gotoEdit(course: Course, event: any) {
        this.router.navigate(['/course-edit', course.courseID]);
    }

    addCourse() {
        this.router.navigate(['/course-edit', 'new']);
    }

    gotoStudentEnrollment(course: Course, event: any) {
      this.router.navigate(['/student-enrollment', course.courseID, course.courseName]);
    }

    goBack() {
        window.history.back();
    }
}
