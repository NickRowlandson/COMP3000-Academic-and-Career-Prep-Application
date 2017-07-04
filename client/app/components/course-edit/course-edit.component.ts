import { Component, Input, OnInit } from '@angular/core';
import { Course } from "../../models/Course";
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from "../../services/course.service";

@Component({
  selector: 'course-edit',
  templateUrl: './app/components/course-edit/course-edit.component.html',
  styleUrls: ['./app/components/course-edit/course-edit.component.css']
})

export class CourseEditComponent implements OnInit {
  @Input() course: Course;
  newCourse = false;
  error: any;
  navigated = false; // true if navigated here


  constructor(private courseService: CourseService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      console.log(id);
      if (id === 'new') {
        this.newCourse = true;
        this.course = new Course();
        console.log(this.newCourse);
      } else {
        console.log("course id " + id);
        this.newCourse = false;
        this.courseService.getCourse(id).then(course => {
          this.course = course;
          console.log(course.courseName);
        });
      }
    });
  }

  save() {
    this.courseService
      .save(this.course)
      .then(course => {
        this.course = course; // saved user, w/ id if new
        this.goBack();
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack() {
    window.history.back();
  }
}
