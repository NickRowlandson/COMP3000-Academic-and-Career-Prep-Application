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
    selectedDays: string[] = [];
    // popup 

    display: boolean = false;
    tempPop = {start:'', end:''};
    // drop down
    professors: SelectItem[] = [];
    campuses: SelectItem[] = [];
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

        this.header = {
            left: 'prev',
            center: 'title',
            right: 'next'
        };

        this.options = {
            prev: 'circle-triangle-w',
            defaultView: "month",
            height: "auto",
            selectable: true
        };
    } // end of init 

    // check boxes onchange event 
    cb_onchange(e, day) {
        console.log(e);
        if (e) {
            // import days
                // check if user declare time range
                if (this.course.courseStart === undefined && this.course.courseEnd === undefined) {
                alert('you must pick a date!');
                this.unCheck(day); // unselect element 
                }else {
                this.generateDays(day, this.course.courseStart, this.course.courseEnd);
                console.log(moment());
                 this.events.push({ title: "1", "start":'2017-08-07', "day":"Mon" });
                    console.log(this.events);
                }
        } else {
            //delete all mon
            alert('deleting');
           this.events =  this.events.filter(result => result.day !== day);
           console.log(this.events);
        }
    }
 // this function will uncheck checkbox based on week day that given 
  unCheck(day) {
    this.selectedDays = this.selectedDays.filter(result => result !== day);
 }
 // this function will generate days that maches specification
 generateDays(day, start_date, end_date) {
  alert('generateing days');
 }
    handleEventClick(e) {
        //    alert('Event: ' + calEvent.title);
        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('View: ' + view.name);

        // // change the border color just for fun
        // $(this).css('border-color', 'red');
        console.log(e);
    }

    handleDayClick(e) {
        let date = e.date.format();
        if (this.checkExist(date)) {
            this.events.push({ title: "1", "start": date });
        } else {
            alert('event exist');
        }

    }
    checkExist(date) {
        let ndate = this.events.filter(result => result.start === date);
        console.log(ndate.length);
        if (ndate.length === 1) {
            return false;
        } else {
            return true;
        }
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
                    result.forEach((item) => {
                        // item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                        // item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                        // item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                        // item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                    });
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


    gCalendar() {

    }


}
