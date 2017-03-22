import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from "../../models/Student";
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'suitabilityForm',
    templateUrl: './app/components/suitabilityForm/suitabilityForm.component.html',
    styleUrls: ['./app/components/suitabilityForm/suitabiltyForm.component.css']
})
export class SuitabilityFormComponent {
  @Input() student: Student;
  error: any;
  date: any;
  currentUser:any;
  navigated = false; // true if navigated here


  constructor(private studentService: StudentService, private route: ActivatedRoute, private authService: AuthService) {
    this.student = new Student();
    this.date =  new Date();
  }

  ngOnInit() {
    this.authService.loggedUser.subscribe(
        data => {
          if (data) {
            var username = data.replace(/['"]+/g, '');
            this.currentUser = username;
          } else {
            this.currentUser = null;
          }
        },
        err => {
            console.log(err);
        }
    );
  }

  save() {
      this.student["enquiryDate"] = this.date;
      this.student["authLevel"] = "client";
      this.student["username"] = this.student.firstName.charAt(0).toLowerCase() + this.student.lastName.toLowerCase();
      this.student["password"] = this.student.birthday.replace(/-/g, "");
      console.log(this.student);
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
};
