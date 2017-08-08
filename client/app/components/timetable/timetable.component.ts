import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";
import { CourseService} from '../../services/course.service';
declare var moment: any;

@Component({
  selector: 'timetable',
  templateUrl: './app/components/timetable/timetable.component.html',
  styleUrls: ['./app/components/timetable/timetable.component.css']
})

export class TimetableComponent implements OnInit {
  @Input() student: Student;
  events: any[] = [];
  header: any;
  options: any;


  constructor(private studentService: StudentService, private courseService:CourseService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser.userID;

    this.studentService.getEventsById(userID).then(result => {
      result.forEach((i) => {
        var classDay = 0;

        if (i.classDay === "Monday") {
          classDay = 1;
        } else if (i.classDay === "Tuesday") {
          classDay = 2;
        } else if (i.classDay === "Wednesday") {
          classDay = 3;
        } else if (i.classDay === "Thursday") {
          classDay = 4;
        } else if (i.classDay === "Friday") {
          classDay = 5;
        }

        i.courseStart = moment(i.courseStart).format('YYYY-MM-DD');
        i.courseEnd = moment(i.courseEnd).format('YYYY-MM-DD');
        i.classStartTime = moment(i.classStartTime).format('hh:mm A');
        i.classEndTime = moment(i.classEndTime).format('hh:mm A');

        if (i.classTimeStr) {
          var array = i.classTimeStr.split(',');
          for (let item of array) {
            var date = item.split(' ');
            var day = date[0];
            var time = date[1];
            var startTime = time.split('-')[0];
            var endTime = time.split('-')[1];
            this.events.push(
              {
                "title": i.courseName,
                "start": day + "T" + startTime,
                "end": day + "T" + endTime
              });
          }
        } else {
          console.log("No class date string available");
        }
      });
    });

    // this.header = {
    //   left: 'prev',
    //   center: 'title',
    //   right: 'next'
    // };

    this.options = {
      selectable:true,
      prev: 'circle-triangle-w',
      defaultView: "agendaWeek",
      minTime: "08:00:00",
      maxTime: "22:00:00",
      height: "auto"
    };
  }

  goBack() {
    window.history.back();
  }
}
