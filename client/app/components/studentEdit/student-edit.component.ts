import { Component, Input, OnInit } from '@angular/core';
import { Student } from "../../models/Student";
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from "../../services/student.service";

@Component({
    selector: 'student-edit',
    templateUrl: './app/components/studentEdit/student-edit.component.html',
    styleUrls: ['./app/components/studentEdit/student-edit.component.css']
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
            .save(this.student)
            .then(student => {
                this.student = student; // saved student, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack() {
        window.history.back();
    }
}
