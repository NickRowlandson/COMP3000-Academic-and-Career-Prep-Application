import { Component, Input, OnInit } from '@angular/core';
import { Course } from "../../models/Course";
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { SelectItem } from 'primeng/primeng';
declare var moment;
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
    private sub: any;
    id: any;
  events: any[] = [];
  header: any;
  options: any;
  
  selectedDays: string[]=[];

    datepickerOpts: any = {
        startDate: moment(),
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'YYYY-MM-DD'
    };
    // drop down
    professors: SelectItem[] = [];
    campuses: SelectItem[] = [];
    daysOfWeek: SelectItem[] = [{ label: 'Monday', value: 'Monday' },
                                { label: 'Tuesday', value: 'Tuesday' },
                                { label: 'Wednesday', value: 'Wednesday' },
                                { label: 'Thursday', value: 'Thursday' },
                                { label: 'Friday', value: 'Friday' }];


    constructor(private courseService: CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.subscribeCourse();

        // get professors
        this.courseService.getProfessors().then((result) => {
            result.forEach((i) => {
                this.professors.push({
                    label: i.professorName,
                    value: i.userID
                });
            });
        });
        // get campuses
        this.courseService.getCampuses().then((result) => {
            result.forEach((i) => {
                this.campuses.push({
                    label: i.campusName,
                    value: i.campusId
                });
            });
        });

        //
        // this.route.params.forEach((params: Params) => {
        //   let id = params['id'];
        //   if (id === 'new') {
        //     this.newCourse = true;
        //     this.course = new Course();
        //   } else {
        //     this.newCourse = false;
        //     this.courseService
        //       .getCourse(id)
        //       .then(result => {
        //         // this.course = course[0];
        //       console.log(result);
        //         this.course= result;
        //         // console.log(this.course)
        //       });
        //   }
        // });

   this.header = {
      left: 'prev',
      center: 'title',
      right: 'next'
    };

    this.options = {
      prev: 'circle-triangle-w',
      defaultView: "month",
      //minTime: "06:00:00",
      //maxTime: "22:00:00",
      height: "auto"
    };



    }
    subscribeCourse() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id === 'new') {
                this.newCourse = true;
                this.course = new Course();
            } else {
                this.newCourse = false;
                this.courseService.getCourse(this.id).then((result) => {
                    this.course = result[0];
                    console.log(this.course);
                });
            }
        });
    }

    save() {
        // **** need validation
        this.courseService
            .save(this.course)
            .then(course => {
                this.course = course; // saved user, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
    }
    handleDateFromChange(e) {

    }
    goBack() {
        window.history.back();
    }





}
