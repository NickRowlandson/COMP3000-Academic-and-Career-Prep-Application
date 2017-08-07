import { Component, OnInit, NgZone } from '@angular/core';
import { Student } from "../../models/student";
import { ConsentForm } from "../../models/consentForm";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { LearningStyleForm } from "../../models/learningStyleForm";
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { AuthService } from "../../services/authentication.service";

declare var swal: any;

@Component({
    selector: 'student-manage',
    templateUrl: './app/components/student-manage/student-manage.component.html',
    styleUrls: ['./app/components/student-manage/student-manage.component.css']
})

export class StudentManageComponent implements OnInit {
    students: Student [];
    error: any;
    studentInfoView: boolean = false;
    studentView: Student;
    consentView: ConsentForm;
    suitabilityView: SuitabilityForm;
    learningStyleView: LearningStyleForm;
    showGeneral: boolean = true;
    showSuitability: boolean;
    showConsent: boolean;
    showLearningStyle: boolean;

    //bar chart (learning style)
    barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    barChartLabels:string[] = ['Hearing', 'Seeing', 'Doing'];
    barChartType:string = 'bar';
    barChartLegend:boolean = false;
    barChartData:any;
    barChartColors: any[] = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];

    constructor(private router: Router, private ngZone: NgZone, private studentService: StudentService, private authService: AuthService) {

    }

    ngOnInit() {
        this.getStudents();
    }

    getStudents() {
      this.studentService
        .getStudents()
        .then(students => {
          if (students.status === "403") {
            this.students = null;
          } else {
            this.students = students;
            for (let student of this.students) {
              student.fullName = student.firstName + " " + student.lastName;
            }
          }
        })
        .catch(error => this.error = error);
    }

    addClient() {
      this.router.navigate(['/suitability']);
    }

    gotoEdit(student: Student, event: any) {
        this.router.navigate(['/student-edit', student.studentID]);
    }

    addStudent() {
        this.router.navigate(['/student-edit', 'new']);
    }

    archiveAlert(student: Student, event: any) {
      swal({
          title: 'Archive student (' + student.firstName + ' ' + student.lastName + ')',
          text: "Are you sure want to do this?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Archive it!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.archiveStudent(student, event);
        }
      });
    }

    archiveStudent(student, event): void {
      swal(
          'Sorry...',
          'This functionality is not yet available',
          'info'
      );
    }

    populatePRF(student) {
        this.studentService
            .populatePRF(student.userID)
            .then(response => {
              swal(
                  'Sorry...',
                  'This feature is not yet available',
                  'info'
              );
            })
            .catch(error => console.log(error));
    }

    viewInfo(student: Student) {
      this.showGeneral = true;
      this.showSuitability = false;
      this.showConsent = false;
      this.showLearningStyle = false;
      this.studentInfoView = true;
      this.studentView = student;
      this.studentService
        .getAllFormsByID(student)
        .then(forms => {
          if (forms.status === "403") {
            this.consentView = null;
            this.learningStyleView = null;
            this.suitabilityView = null;
          } else {
            this.consentView = forms.consentForm[0];
            this.learningStyleView = forms.learningStyleForm[0];
            this.suitabilityView = forms.suitabilityForm[0];
            this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing]}];
          }
        })
        .catch(error => this.error = error);
    }

    overallStatus() {
      this.studentInfoView = false;
    }

    sectionBtnClicked(event, section) {
        if (section === "general") {
            this.showGeneral = true;
            this.showSuitability = false;
            this.showConsent = false;
            this.showLearningStyle = false;
        } else if (section === "suitability") {
            this.showGeneral = false;
            this.showSuitability = true;
            this.showConsent = false;
            this.showLearningStyle = false;
        } else if (section === "consent") {
            this.showGeneral = false;
            this.showSuitability = false;
            this.showConsent = true;
            this.showLearningStyle = false;
        } else if (section === "learningStyle") {
            this.showGeneral = false;
            this.showSuitability = false;
            this.showConsent = false;
            this.showLearningStyle = true;
        }
    }

    goBack() {
        window.history.back();
    }
}
