import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../models/course";
import { Student } from "../../models/Student";
import { StudentService } from "../../services/student.service";
import { CourseService} from '../../services/course.service';

@Component({
    selector: 'visview',
    templateUrl: './app/components/visview/visview.component.html',
    styleUrls: ['./app/components/visview/visview.component.css']
})


export class VisviewComponent implements OnInit {
       @Input() student: Student;


    events: any[]=[];

    header: any;

    options: any;


    constructor(private studentService: StudentService, private courseService:CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {


       this.studentService.getEventsById(33).then(result =>
     {

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
            defaultView: "agendaWeek",
            minTime: "06:00:00",
            maxTime: "22:00:00",
            height: 740

        }




  }

}
