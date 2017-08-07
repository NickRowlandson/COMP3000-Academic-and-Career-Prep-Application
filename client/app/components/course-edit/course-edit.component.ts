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
    weekDay: string;
    idGen: number = 100;
    // calendar
    events: any[] = [];
    event: MyEvent;
    header: any;
    options: any;
    selectedDays: string[] = [];
    // pop up
    dialogVisible: boolean = false;
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
            if (this.course.courseStart === undefined || this.course.courseEnd === undefined || this.course.courseStart === null || this.course.courseEnd == null) {
                alert('you must pick a date!');
                this.unCheck(weekday); // unselect element
            } else {
                this.weekDay = weekday;
                this.event = new MyEvent();
                this.event.type = "batchGen";
                this.dialogVisible = true;
            }
        } else {
            this.events = this.events.filter(result => result.weekday !== weekday);
        }
    }
    // this function will uncheck checkbox based on week day that given
    unCheck(weekday) {
        this.selectedDays = this.selectedDays.filter(result => result !== weekday);
    }
    // this function will generate days that maches specification
    private generateDays(weekday, start_date, end_date) {
        // figure out what's next week day
        let momentIndex, nextDay;
        for (let i = 0; i < this.weekDays.length; i++) {
            if (this.weekDays[i] === weekday) {
                momentIndex = i + 1;
            }
        }
        if (moment(start_date).isoWeekday() > momentIndex) {
            nextDay = moment(start_date).isoWeekday(momentIndex + 7);
        } else {
            nextDay = moment(start_date).isoWeekday(momentIndex);
        }
        let root = 0, tempStart, tempEnd;
        tempStart = this.event.dayStart;
        tempEnd = this.event.dayEnd;
        while (!(moment(nextDay).add(7 * root, 'day')).isAfter(moment(end_date))) {
            this.event = new MyEvent();
            this.event.id = this.idGen++;
            this.event.start = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD') + ' ' + moment(tempStart).format('HH:mm');
            this.event.end = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD') + ' ' + moment(tempEnd).format('HH:mm');
            this.event.weekday = weekday;
            this.event.title = moment(nextDay).add(7 * root, 'day').format('YYYY-MM-DD');
            this.events.push(this.event);
            root++;
        }
    }

    saveEvent() {
        if (this.event.type === 'add') {

            let momentIndex = -1;
            for (let i = 0; i < this.weekDays.length; i++) {
                if (i === moment(this.event.title).isoWeekday()) {
                    momentIndex = i - 1;
                }
            }
            this.event.weekday = this.weekDays[momentIndex];
            this.event.id = this.idGen++;  // title, id , weekday,dayStart,dayEnd
            this.event.start = this.event.title + ' ' + moment(this.event.dayStart).format('HH:mm');
            this.event.end = this.event.title + ' ' + moment(this.event.dayEnd).format('HH:mm');
            if (this.checkExist(this.event.title)) {
                this.events.push(this.event);
                console.log('adding event');
                console.log(this.event);
            } else {
                alert('event exist');
            }

        } else if (this.event.type === 'edit') {

            if (this.event.id) {
                this.event.start = this.event.title + ' ' + moment(this.event.dayStart).format('HH:mm');
                this.event.end = this.event.title + ' ' + moment(this.event.dayEnd).format('HH:mm');

                let index: number = this.findEventIndexById(this.event.id);

                if (index >= 0) {
                    this.events[index] = this.event;
                }
            }
            console.log('editing event');
            console.log(this.event);
        } else if (this.event.type === 'batchGen') {

            this.generateDays(this.weekDay, this.course.courseStart, this.course.courseEnd);
            console.log('generating event done, printing the list');
            console.log(this.events);
        }

        this.dialogVisible = false;
        this.event = null;
    }
    deleteEvent() {
        let index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }
    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    }


    // event handler for event click
    handleEventClick(e) {
        console.log(e.calEvent);

        this.event = new MyEvent();
        this.event.type = 'edit';
        this.event.title = e.calEvent.title;
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        this.event.id = e.calEvent.id;
        this.dialogVisible = true;
        // this.events = this.events.filter(result => result !== event );
    }
    // event handler for day click
    handleDayClick(e) {
        let date = e.date.format();
        this.event = new MyEvent();
        this.event.title = date;
        this.event.type = "add";
        this.dialogVisible = true;
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
export class MyEvent {
    id: number;
    type: string;
    title: string;
    dayStart: string;
    dayEnd: string;
    start: string;
    end: string;
    weekday: string;
}
