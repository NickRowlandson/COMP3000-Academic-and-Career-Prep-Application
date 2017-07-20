import { Component, Input, OnInit } from '@angular/core';
import { Student } from "../../models/Student";
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'student-edit',
    templateUrl: './app/components/student-edit/student-edit.component.html',
    styleUrls: ['./app/components/student-edit/student-edit.component.css']
})

export class StudentEditComponent implements OnInit {
    @Input() student: Student;
    error: any;
    navigated = false; // true if navigated here


    constructor(private studentService: StudentService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            this.studentService.getStudent(id)
                .then(student => this.student = student);
        });
    }

    save() {
        this.studentService
            .update(this.student)
            .then(student => {
                this.student = student;
                this.goBack();
            })
            .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
