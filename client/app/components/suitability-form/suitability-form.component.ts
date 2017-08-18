import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';
declare var swal: any;
declare var moment: any;

@Component({
    selector: 'suitabilityForm',
    templateUrl: './app/components/suitability-form/suitability-form.component.html',
    styleUrls: ['./app/components/suitability-form/suitability-form.component.css']
})

export class SuitabilityFormComponent {
    @Input() client: Client;
    @Input() suitabilityForm: SuitabilityForm;
    error: any;
    date: any;
    currentUser: any;
    navigated = false; // true if navigated here
    showSection1 = true;
    showSection2 = false;
    showSection3 = false;
    showSection4 = false;
    showSection5 = false;
    showSection6 = false;

    showSectionBtn1 = true;
    showSectionBtn2 = false;
    showSectionBtn3 = false;
    showSectionBtn4 = false;
    showSectionBtn5 = false;
    showSectionBtn6 = false;

    partAWarning = false;
    partBWarning = false;
    partAPoints = 0;
    partBPoints = 0;
    totalPoints = 0;

    constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
        this.client = new Client();
        this.suitabilityForm = new SuitabilityForm();
        this.date = new Date();
    }

    ngOnInit() {

    }

    clicked(item) {
        switch (item) {
            case 'section1':
                this.showSection1 = true;
                this.showSection2 = false;
                this.showSection3 = false;
                this.showSection4 = false;
                this.showSection5 = false;
                this.showSection6 = false;
                break;
            case 'section2':
                this.showSection1 = false;
                this.showSection2 = true;
                this.showSection3 = false;
                this.showSection4 = false;
                this.showSection5 = false;
                this.showSection6 = false;
                break;
            case 'section3':
                this.showSection1 = false;
                this.showSection2 = false;
                this.showSection3 = true;
                this.showSection4 = false;
                this.showSection5 = false;
                this.showSection6 = false;
                break;
            case 'section4':
                this.showSection1 = false;
                this.showSection2 = false;
                this.showSection3 = false;
                this.showSection4 = true;
                this.showSection5 = false;
                this.showSection6 = false;
                break;
            case 'section5':
                this.showSection1 = false;
                this.showSection2 = false;
                this.showSection3 = false;
                this.showSection4 = false;
                this.showSection5 = true;
                this.showSection6 = false;
                break;
            case 'section6':
                this.showSection1 = false;
                this.showSection2 = false;
                this.showSection3 = false;
                this.showSection4 = false;
                this.showSection5 = false;
                this.showSection6 = true;
                this.tallyPoints();
                break;
            default:
                this.showSection1 = true;
                this.showSection2 = false;
                this.showSection3 = false;
                this.showSection4 = false;
                this.showSection5 = false;
                this.showSection6 = false;
        }
    }

    tallyPoints() {
        var factorPoints = 0;
        this.partAPoints = 0;
        this.partBPoints = 0;
        this.totalPoints = 0;
        this.partAWarning = false;
        this.partBWarning = false;
        // PART A
        if (this.suitabilityForm.offerStartDate === 'Less than one year') { this.partAPoints += 3; } else if
        (this.suitabilityForm.offerStartDate === 'In one year') { this.partAPoints += 2; } else if
        (this.suitabilityForm.offerStartDate === 'More than a Year') { this.partAPoints += 1; }

        if (this.suitabilityForm.meetsGoal === 'No') { this.partAPoints += 3; } else if
        (this.suitabilityForm.meetsGoal === 'Yes but lacks skills/high enough marks') { this.partAPoints += 2; } else if
        (this.suitabilityForm.meetsGoal === 'Yes') { this.partAPoints += 1; }

        if (this.suitabilityForm.timeOutOfSchool === '6 or more years') { this.partAPoints += 3; } else if
        (this.suitabilityForm.timeOutOfSchool === '1-6 years') { this.partAPoints += 2; } else if
        (this.suitabilityForm.timeOutOfSchool === 'Less than 1 year') { this.partAPoints += 1; }

        if (this.suitabilityForm.inProgramBefore === 'No/Left with appropriate reasons') { this.partAPoints += 3; } else if
        (this.suitabilityForm.inProgramBefore === 'Yes - Appropriate progress') { this.partAPoints += 2; } else if
        (this.suitabilityForm.inProgramBefore === 'Yes – No progress') { this.partAPoints += 1; }

        if (this.suitabilityForm.employment === 'Not working') { this.partAPoints += 3; } else if
        (this.suitabilityForm.employment === 'Working part time') { this.partAPoints += 2; } else if
        (this.suitabilityForm.employment === 'Working full time') { this.partAPoints += 1; }

        if (this.suitabilityForm.incomeSource === 'OW  ODSP  EI  SC') { this.partAPoints += 3; } else if
        (this.suitabilityForm.incomeSource === 'No income') { this.partAPoints += 2; } else if
        (this.suitabilityForm.incomeSource === 'Employed') { this.partAPoints += 1; }

        if (this.suitabilityForm.ageRange === '45-65 years old') { this.partAPoints += 3; } else if
        (this.suitabilityForm.ageRange === '19-29 years old') { this.partAPoints += 2; } else if
        (this.suitabilityForm.ageRange === '30-44 years old') { this.partAPoints += 1; }

        //PART B
        if (this.suitabilityForm.hoursPerWeek === '10-20') { this.partBPoints += 3; } else if
        (this.suitabilityForm.hoursPerWeek === '5-10') { this.partBPoints += 2; } else if
        (this.suitabilityForm.hoursPerWeek === 'Less than 5') { this.partBPoints += 1; }

        if (this.suitabilityForm.workHistory === 'Less than 1 year experience in the field') { this.partBPoints += 3; } else if
        (this.suitabilityForm.workHistory === '1-4 years experience in the field') { this.partBPoints += 2; } else if
        (this.suitabilityForm.workHistory === '4+ years experience in the field') { this.partBPoints += 1; }

        if (this.suitabilityForm.factorHealth) { factorPoints++; }
        if (this.suitabilityForm.factorInstructions) { factorPoints++; }
        if (this.suitabilityForm.factorCommunication) { factorPoints++; }
        if (this.suitabilityForm.factorLanguage) { factorPoints++; }
        if (this.suitabilityForm.factorComputer) { factorPoints++; }
        if (this.suitabilityForm.factorHousing) { factorPoints++; }
        if (this.suitabilityForm.factorTransportation) { factorPoints++; }
        if (this.suitabilityForm.factorDaycare) { factorPoints++; }
        if (this.suitabilityForm.factorInternet) { factorPoints++; }
        if (this.suitabilityForm.factorPersonal) { factorPoints++; }

        if (factorPoints >= 0 && factorPoints <= 4) { this.partBPoints += 3; } else if
        (factorPoints > 4 && factorPoints <= 8) { this.partBPoints += 2; } else if
        (factorPoints > 8) { this.partBPoints += 1; }

        this.totalPoints = this.partAPoints - this.partBPoints;

        if (this.partAPoints < 14) { this.partAWarning = true; }
        if (this.partBPoints < 4) { this.partBWarning = true; }
    }

    next(event, nextSection) {
        switch (nextSection) {
            case 'section2':
                this.showSectionBtn2 = true;
                this.clicked(nextSection);
                break;
            case 'section3':
                this.showSectionBtn3 = true;
                this.clicked(nextSection);
                break;
            case 'section4':
                this.showSectionBtn4 = true;
                this.clicked(nextSection);
                break;
            case 'section5':
                this.showSectionBtn5 = true;
                this.clicked(nextSection);
                break;
            case 'section6':
                this.showSectionBtn6 = true;
                this.clicked(nextSection);
                break;
            default:
        }
    }

    save() {
        if (this.client.birthday && this.client.firstName && this.client.lastName && this.client.email && this.client.phone ) {
          var birthday = new Date(this.client.birthday);
          var birthdayFormat = moment(birthday).format('DD-MM-YYYY');
          this.client["inquiryDate"] = this.date;
          this.client["username"] = this.client.firstName + this.client.lastName;
          this.client["password"] = birthdayFormat.replace(/-/g, "");
          console.log(this.client.password);
          if (Object.keys(this.suitabilityForm).length === 0) {
            swal({
                title: 'Suitability Incomplete',
                text: "The suitability section of the form has not been filled out. Are you sure you want to continue?",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue'
            }).then(isConfirm => {
              if (isConfirm) {
                this.saveClient();
              }
            }).catch(error => {
              this.clicked('section2');
            });
          } else {
            this.saveClient();
          }
        } else {
          swal(
              'Whoops...',
              "Please complete all fields in the 'Client Info' section",
              'warning'
          );
          this.clicked('section1');
        }
    }

    saveClient() {
      this.clientService
          .save(this.client, this.suitabilityForm)
          .then(client => {
            console.log(client);
            if (client.error === "username in use") {
              swal(
                  'Username taken',
                  'Please enter a different first and last name.',
                  'warning'
              );
              this.clicked('section1');
            } else if (client.error === "incorrect email format") {
              swal(
                  'Incorrect email format',
                  'Please enter a proper email.',
                  'warning'
              );
              this.clicked('section1');
            }  else if (client.success === "success") {
              console.log("success");
              this.router.navigate(['/clients']);
            } else {
              console.log("????");
              this.router.navigate(['/clients']);
            }
          })
          .catch(error => {
            console.log("Error " + error );
          });
    }

    goBack() {
      swal({
          title: 'Are you sure?',
          text: "Any information on this form will be lost if you proceed without saving.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, continue'
      }).then(isConfirm => {
        if (isConfirm) {
          window.history.back();
        }
      }).catch(error => {
        //console.log("Canceled");
      });
    }
};
