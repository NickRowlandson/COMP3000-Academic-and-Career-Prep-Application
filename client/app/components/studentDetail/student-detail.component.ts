import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../models/Student";
import { ActivatedRoute, Params } from '@angular/router';
import {StudentService} from "../../services/student.service";

@Component({
    selector: 'my-student-detail',
    templateUrl: './app/components/studentDetail/student-detail.component.html'
})

export class StudentDetailComponent implements OnInit {
    @Input() student: Student;
    newStudent = false;
    error: any;
    navigated = false; // true if navigated here


    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id === 'new') {
                this.newStudent = true;
                this.student = new Student();
            } else {
                this.newStudent = false;
                this.studentService.getStudent(id)
                    .then(student => this.student = student);
            }
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
