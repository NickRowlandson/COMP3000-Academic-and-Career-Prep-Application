import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {Student} from "../../models/student";
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'student-view',
    templateUrl: './app/components/studentView/student-view.component.html',
    styleUrls: ['./app/components/studentView/student-view.component.css']
})

export class StudentViewComponent implements OnInit {
    @Input() student: Student;

    constructor(private route: ActivatedRoute, private studentService: StudentService) {
      
    }

    ngOnInit() {
      this.route.params.forEach((params: Params) => {
          let id = params['id'];
          this.studentService.getStudent(id)
            .then(student => this.student = student);
        });
    }

    goBack() {
        window.history.back();
    }

}
