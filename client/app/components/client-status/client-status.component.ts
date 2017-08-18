import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { Student } from "../../models/student";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ConsentForm } from "../../models/consentForm";
import { LearningStyleForm } from "../../models/learningStyleForm";
import { ClientService } from "../../services/client.service";
import { StudentService } from "../../services/student.service";
import { AuthService } from "../../services/authentication.service";
declare var swal: any;

@Component({
    selector: 'client-status',
    templateUrl: './app/components/client-status/client-status.component.html',
    styleUrls: ['./app/components/client-status/client-status.component.css']
})

export class ClientStatusComponent implements OnInit {
    data: any[];
    allClients: Client[];
    suitabilityForms: SuitabilityForm[];
    consentForms: ConsentForm[];
    learningStyleForms: LearningStyleForm[];
    clientTotal: any;
    actionItems: any[];
    error: any;

    clientView: Client;
    consentView: ConsentForm;
    suitabilityView: SuitabilityForm;
    learningStyleView: LearningStyleForm;

    showSuitabilityEdit: boolean;

    addSuitability: boolean = false;
    @Input() suitabilityForm: SuitabilityForm;
    clientSuitability: Client[];
    partAWarning = false;
    partBWarning = false;
    partAPoints = 0;
    partBPoints = 0;
    totalPoints = 0;
    calculated: boolean = false;

    statusReport: boolean = true;
    showGeneral: boolean = true;
    showSuitability: boolean;
    showConsent: boolean;
    showLearningStyle: boolean;

    //doughnut chart (client status)
    doughnutChartLabels: string[];
    doughnutChartData: number[];
    doughnutChartType: string;
    doughnutChartColors: any[] = [{ backgroundColor: ["#FF4207", "#F8E903", "#309EFF", "#2AD308"] }];
    stage1: any;
    stage2: any;
    stage3: any;
    stage4: any;

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

    constructor(private router: Router, private clientService: ClientService, private studentService: StudentService, private authService: AuthService) {
    }

    ngOnInit() {
        this.getClients();
    }

    getClients() {
        this.clientService
            .getClients()
            .then(objects => {
                if (objects.status === "403") {
                    this.data = null;
                } else {
                    this.setData(objects);
                }
            })
            .catch(error => this.error = error);
    }

    update(event) {
      console.log();
    }

    setData(objects) {
        this.data = objects.clients;
        for (let client of this.data) {
          client.fullName = client.firstName + " " + client.lastName;
        }
        console.log(this.data);
        this.allClients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        this.consentForms = objects.consentForms;
        this.learningStyleForms = objects.learningStyleForms;
        this.stage1 = this.data.filter(x => x.suitability);
        this.stage2 = this.data.filter(x => !x.suitability && x.consent && x.learningStyle);
        this.stage3 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle);
        this.stage4 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam);
        this.doughnutChartLabels = ['Suitability', 'Consent/Learning Style', 'Banner/CAM', 'Transfer Ready'];
        this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
        this.doughnutChartType = 'doughnut';
        this.addSuitability = false;
        this.statusReport = true;
    }

    addClient() {
        this.router.navigate(['/suitability']);
    }

    deleteAlert(client: Client) {
        swal({
            title: 'Delete client (' + client.firstName + ' ' + client.lastName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(isConfirm => {
          if (isConfirm) {
            this.deleteClient(client);
          }
        }).catch(error => {
          //console.log("Canceled");
        });
    }

    deleteClient(client: Client) {
        event.stopPropagation();
        this.clientService
            .delete(client)
            .then(res => {
                this.data = this.data.filter(h => h !== client);
                swal(
                    'Deleted!',
                    'Client record has been deleted.',
                    'success'
                );
                this.clientTotal = this.data.length;
            })
            .catch(error => this.error = error);
    }

    showClientView(client: Client) {
        this.clientView = client;
        this.resetView();
        this.showGeneral = true;

        var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
        this.suitabilityView = suitabilityForm[0];

        var consentForm = this.getConsentFormByFilter(client.userID);
        this.consentView = consentForm[0];

        var learningStyleForm = this.getLearningStyleFormByFilter(client.userID);
        this.learningStyleView = learningStyleForm[0];
        if (this.learningStyleView) {
          this.barChartData = [{ data: [this.learningStyleView.hearing, this.learningStyleView.seeing, this.learningStyleView.doing]}];
        }
    }

    getSuitabilityFormByFilter(id) {
        return this.suitabilityForms.filter(x => x.userID === id);
    }

    getConsentFormByFilter(id) {
        return this.consentForms.filter(x => x.userID === id);
    }

    getLearningStyleFormByFilter(id) {
        return this.learningStyleForms.filter(x => x.userID === id);
    }

    sectionBtnClicked(event, section) {
        if (section === "general") {
          this.resetView();
            this.showGeneral = true;
        } else if (section === "suitability") {
          this.resetView();
            this.showSuitability = true;
        } else if (section === "consent") {
          this.resetView();
            this.showConsent = true;
        } else if (section === "learningStyle") {
          this.resetView();
            this.showLearningStyle = true;
        }
    }

    showStatusReport(event) {
        this.showSuitabilityEdit = false;
        this.addSuitability = false;
        this.statusReport = true;
        this.clientSuitability = null;
        this.clientView = null;
        this.addSuitability = false;
    }

    chartClicked(e: any): void {
        try {
            var index = e.active[0]._index;
            if (index === 0) {
                this.data = this.allClients.filter(x => x.suitability);
            } else if (index === 1) {
                this.data = this.allClients.filter(x => !x.suitability && x.consent && x.learningStyle);
            } else if (index === 2) {
                this.data = this.allClients.filter(x => !x.suitability && !x.consent && !x.learningStyle);
            } else if (index === 3) {
                this.data = this.allClients.filter(x => !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam);
            }
        } catch (err) {
            this.data = this.allClients;
        }
    }

    chartHovered(e: any): void {

    }

    createAsStudent(client: Student) {
      this.studentNumber(client);
    }

    studentNumber(client) {
      swal({
          title: 'Student Number',
          type: 'info',
          text: 'Please enter student number for ' + client.firstName + ' ' + client.lastName + '',
          input: "text",
          inputPlaceholder: "Enter Student Number",
          showCancelButton: true,
          animation: "slide-from-top",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Save'
      }).then(inputValue => {
        if (inputValue) {
          client.studentNumber = inputValue;
          this.removeAlert(client);
        }
      }).catch(error => {
        console.log("Canceled " + error); // TODO: Display error message
      });
    }

    removeAlert(client) {
      swal({
          title: 'Transfer client (' + client.firstName + ' ' + client.lastName + ')?',
          text: 'Are you sure you want to create as student with #' + client.studentNumber + '?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, transfer!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.studentService
              .postNew(client)
              .then(result => {
                this.removeFromClientTable(client.userID);
              })
              .catch(error => this.error = error); // TODO: Display error message
        }
      }).catch(error => {
        console.log("Canceled"); // TODO: Display error message
      });
    }

    removeFromClientTable(userID): void {
      event.stopPropagation();
      this.clientService
          .removeFromClientTable(userID)
          .then(res => {
              this.data = this.data.filter(h => h.userID !== userID);
              this.stage3 = this.data.filter(x => x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle);
              this.stage4 = this.data.filter(x => x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam);
              this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
              swal(
                  'Transfered',
                  'Client record has been transfered to the student table.',
                  'success'
              );
              this.clientTotal = this.data.length;
          })
          .catch(error => this.error = error);
    }

    addSuitabilityInfo(client) {
      this.clientView = null;
      this.addSuitability = true;
      this.showSuitabilityEdit = false;
      this.statusReport = false;
      this.suitabilityForm = new SuitabilityForm();
      this.suitabilityForm.transcript = false;
      this.suitabilityForm.appropriateGoal = false;
      this.suitabilityForm.isValidAge = false;
      this.suitabilityForm.governmentID = false;
      this.suitabilityForm.schoolRegistration = false;
      this.suitabilityForm.availableDuringClass = false;
      this.suitabilityForm.factorHealth = false;
      this.suitabilityForm.factorInstructions = false;
      this.suitabilityForm.factorCommunication = false;
      this.suitabilityForm.factorLanguage = false;
      this.suitabilityForm.factorComputer = false;
      this.suitabilityForm.factorHousing = false;
      this.suitabilityForm.factorTransportation = false;
      this.suitabilityForm.factorDaycare = false;
      this.suitabilityForm.factorInternet = false;
      this.suitabilityForm.factorPersonal = false;
      this.clientSuitability = client;
    }

    editSuitability(client) {
      this.statusReport = false;
      this.clientView = null;
      this.addSuitability = false;
      this.showSuitabilityEdit = true;
      this.suitabilityForm = this.getSuitabilityFormByFilter(client.userID)[0];
      this.clientSuitability = client;
    }

    saveSuitability() {
      if (this.suitabilityForm.suitabilityID) {
        this.tallyPoints();
        this.suitabilityForm.dbTotalPoints = this.totalPoints;
        this.clientService
          .updateSuitability(this.suitabilityForm)
          .then( res => {
            this.showSuitabilityEdit = false;
            this.clientView = null;
            this.ngOnInit();
          })
          .catch();
      } else {
        this.tallyPoints();
        this.suitabilityForm.dbTotalPoints = this.totalPoints;
        this.clientService
          .addSuitability(this.clientSuitability, this.suitabilityForm)
          .then( res => {
            this.ngOnInit();
          })
          .catch();
      }

    }

    calculate() {
      this.tallyPoints();
      this.calculated = true;
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

        if (this.suitabilityForm.ageRange === '19-29 years old') { this.partAPoints += 1; } else if
        (this.suitabilityForm.ageRange === '30-44 years old') { this.partAPoints += 2; } else if
        (this.suitabilityForm.ageRange === '45-65 years old') { this.partAPoints += 3; }

        //PART B
        if (this.suitabilityForm.hoursPerWeek === '1Less than 5') { this.partBPoints += 1; } else if
        (this.suitabilityForm.hoursPerWeek === '5-10') { this.partBPoints += 2; } else if
        (this.suitabilityForm.hoursPerWeek === '10-20') { this.partBPoints += 3; }

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


    checkboxChange(client) {
      if (client.banner && client.cam) {
        this.stage3 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle && !x.banner && !x.cam);
        this.stage4 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam);
      } else {
        this.stage3 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle);
        this.stage4 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle && x.banner && x.cam);
      }

      this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length, this.stage4.length];
    }

    resetView() {
      this.statusReport = false;
      this.showGeneral = false;
      this.showConsent = false;
      this.showLearningStyle = false;
      this.showSuitability = false;
      this.showSuitabilityEdit = false;
      this.addSuitability = false;
    }

    goBack() {
        window.history.back();
    }
}
