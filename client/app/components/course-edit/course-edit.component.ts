import { Component, Input, OnInit } from '@angular/core';
import { Course } from "../../models/Course";
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { SelectItem } from 'primeng/primeng';
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





  // drop down
  professors: SelectItem[] = [];
  selectedProfessor: string;
  campuses: SelectItem[] = [];
  selectedCampus: string;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {

  }

  ngOnInit() {




    // get professors
    this.courseService.getProfessors().then((result) => {
result.forEach((i)=>
{
  this.professors.push({
        label: i.username,
        value: i.userID
      });
})
    });
// get campuses
this.courseService.getCampuses().then((result) => {
result.forEach((i)=>
{
this.campuses.push({
    label: i.campusName,
    value: i.campusId
  });
})
});





    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id === 'new') {
        this.newCourse = true;
        this.course = new Course();
      } else {
        this.newCourse = false;
        this.courseService
          .getCourse(id)
          .then(course => {
            this.course = course[0];
            console.log(this.course)
          });
      }
    });
  }

  save() {
    console.log(this.course)
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
