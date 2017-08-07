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
    //global variables
    @Input() course: Course;
    weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    newCourse = false;
    error: any;
    navigated = false; // true if navigated here
    private sub: any;
    id: any;


    // calendar
    events: any[] = [];
    header: any;
    options: any;
    selectedDays: string[] = [];

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
    cb_onchange(e, weekday) {
        if (e) {
            // import days
                // check if user declare time range
                if (this.course.courseStart === undefined || this.course.courseEnd === undefined || this.course.courseStart === null || this.course.courseEnd == null) {
                alert('you must pick a date!');
                this.unCheck(weekday); // unselect element
                }else {
                this.generateDays(weekday, this.course.courseStart, this.course.courseEnd);
                }
        } else {
           this.events =  this.events.filter(result => result.weekday !== weekday);
        }
    }
 // this function will uncheck checkbox based on week day that given
  unCheck(weekday) {
    this.selectedDays = this.selectedDays.filter(result => result !== weekday);
 }
 // this function will generate days that maches specification
 generateDays(weekday, start_date, end_date) {
// figure out what's next week day
let  momentIndex , nextDay;
for (let i = 0; i < this.weekDays.length; i++) {
    if (this.weekDays[i]  === weekday) {
        momentIndex = i + 1;
    }
}
if (moment(start_date).isoWeekday() > momentIndex ) {
 nextDay = moment(start_date).isoWeekday(momentIndex + 7);
}else {
nextDay = moment(start_date).isoWeekday(momentIndex);
}
let root = 0, tempDate;
 while ( !(moment(nextDay).add(7 * root, 'day')).isAfter(moment(end_date))) {
this.events.push({ title: moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD'), "start": moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD'), "weekday":weekday });
     root++;
 }
}
 // event handler for event click
    handleEventClick(e) {
        let event =  e.calEvent;
        console.log(event);
        this.events = this.events.filter(result => result !== event );
    }
 // event handler for day click
    handleDayClick(e) {
        let momentIndex = -1;
        let date = e.date.format();
        for (let i = 0; i < this.weekDays.length; i++) {
    if (i  === moment(date).isoWeekday() ) {
        momentIndex = i - 1;
    }
}
        if (this.checkExist(date)) {
            this.events.push({ title:date , "start": date, "weekday": this.weekDays[momentIndex] });
        } else {
            alert('event exist');
        }
    }

    checkExist(date) {
        let ndate = this.events.filter(result => result.start === date);
        if (ndate.length === 1) { // if found event exist then return false to prevent new arry.push
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
                        item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                        item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
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
