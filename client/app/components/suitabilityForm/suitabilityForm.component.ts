import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from "../../models/Student";
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'suitabilityForm',
    templateUrl: './app/components/suitabilityForm/suitabilityForm.component.html',
    styleUrls: ['./app/components/suitabilityForm/suitabilityForm.component.css']
})

export class SuitabilityFormComponent {
  @Input() student: Student;
  error: any;
  date: any;
  currentUser:any;
  navigated = false; // true if navigated here
  showSection1 = true;
  showSection2 = false;
  showSection3 = false;
  showSection4 = false;

  showSectionBtn1 = true;
  showSectionBtn2 = false;
  showSectionBtn3 = false;
  showSectionBtn4 = false;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private authService: AuthService) {
    this.student = new Student();
    this.date =  new Date();
  }

  ngOnInit() {

  }

  clicked(event, item) {
    switch (item) {
      case 'section1':
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
        break;
      case 'section2':
        this.showSection1 = false;
        this.showSection2 = true;
        this.showSection3 = false;
        this.showSection4 = false;
        break;
      case 'section3':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = true;
        this.showSection4 = false;
        break;
      case 'section4':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = true;
        break;
      default:
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
    }
  }

  next(event, nextSection) {
    switch (nextSection) {
      case 'section2':
        this.showSectionBtn2 = true;
        this.clicked(event, nextSection);
        break;
      case 'section3':
        this.showSectionBtn3 = true;
        this.clicked(event, nextSection);
        break;
      case 'section4':
        this.showSectionBtn4 = true;
        this.clicked(event, nextSection);
        break;
      default:
    }
  }

  save() {
      this.student["inquiryDate"] = this.date;
      this.student["authLevel"] = "client";
      this.student["username"] = this.student.firstName + this.student.lastName;
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
