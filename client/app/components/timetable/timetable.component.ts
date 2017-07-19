import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";
import { CourseService} from '../../services/course.service';


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
    console.log(userID);

    this.studentService.getEventsById(userID).then(result => {
      console.log(result)
      result.forEach((i) => {
        this.events.push(
          {
            "title": i.courseName,
            "start": i.courseStart,
            "end": i.courseEnd
          })

      })
    })

    this.header = {
      left: 'prev',
      center: 'title',
      right: 'next'
    }

    this.options = {
      prev: 'circle-triangle-w',
      defaultView: "agendaWeek",
      minTime: "06:00:00",
      maxTime: "22:00:00",
      height: "auto"
    }
  }

  goBack() {
    window.history.back();
  }
}
