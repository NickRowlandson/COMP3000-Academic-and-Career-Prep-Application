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
 

    events: any[];

    header: any;

    options: any;


    constructor(private studentService: StudentService, private courseService:CourseService, private route: ActivatedRoute) {

    }

    ngOnInit() {


       this.studentService.getEventsById(80).then(result =>
     {
    
             console.log(result)
             
            
         
            // for(let i of result){
            //     console.log(i);
            //     // this.courseService.getCourse(i.courseID).then(result=>{
            //     //     console.log(result);
            //     }) 
            // }


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

       this.events = [
            {
                "title": "All Day Event",
                "start": "2017-07-02"
            },
            {
                "title": "Math (A001)",
                "start": "2017-07-18T10:00:00",
                "end": "2017-07-18T13:00:00"
            },
            {
                "title": "Englsh (A002)",
                "start": "2017-07-20T10:00:00",
                "end": "2017-07-20T13:00:00"
            }
            
        ];

   
  }

}
