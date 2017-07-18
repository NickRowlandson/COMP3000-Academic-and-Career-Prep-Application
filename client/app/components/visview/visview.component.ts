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
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek'
		}

       this.events = [
            {
                "title": "All Day Event",
                "start": "2017-07-02"
            },
            {
                "title": "Long Event",
                "start": "2017-07-07",
                "end": "2017-07-08"
            }
        ];

   
  }

}
