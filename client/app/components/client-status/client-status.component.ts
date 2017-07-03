import { Component, OnInit} from '@angular/core';
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
    filterQuery = "";
    allClients: Client[];
    suitabilityForms: SuitabilityForm[];
    consentForms: ConsentForm[];
    learningStyleForms: LearningStyleForm[];
    clientTotal: any;
    error: any;

    clientView: Client;
    consentView: ConsentForm;
    suitabilityView: SuitabilityForm;
    learningStyleView: LearningStyleForm;

    showGeneral: boolean = true;
    showSuitability: boolean;
    showConsent: boolean;
    showLearningStyle: boolean;

    //Chart
    doughnutChartLabels: string[];
    doughnutChartData: number[];
    doughnutChartType: string;
    doughnutChartColors: any[];
    stage1: any;
    stage2: any;
    stage3: any;

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

    populatePRF(client) {
      console.log("generating pdf...");
        this.clientService
            .populatePRF(client.userID)
            .then(response => {
              swal(
                  'Sorry...',
                  'This feature is not yet available',
                  'info'
              );
            })
            .catch(error => console.log(error));
    }

    setData(objects) {
        this.data = objects.clients;
        this.allClients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        this.consentForms = objects.consentForms;
        this.learningStyleForms = objects.learningStyleForms;
        this.stage1 = this.data.filter(x => x.suitability);
        this.stage2 = this.data.filter(x => !x.suitability && x.consent && x.learningStyle);
        this.stage3 = this.data.filter(x => !x.suitability && !x.consent && !x.learningStyle);
        this.doughnutChartLabels = ['Suitability', 'Consent/Learning Style', 'Forms Complete'];
        this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length];
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    }

    addClient() {
        this.router.navigate(['/suitability']);
    }

    // gotoEdit(client: Client, event: any) {
    //     this.router.navigate(['/clientEdit', client.clientID]);
    // }

    deleteAlert(client, event) {
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
            this.deleteClient(client, event);
          }
        });
    }

    deleteClient(client: Client, event: any) {
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

        this.showGeneral = true;
        this.showSuitability = false;
        this.showConsent = false;
        this.showLearningStyle = false;

        var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
        this.suitabilityView = suitabilityForm[0];

        var consentForm = this.getConsentFormByFilter(client.userID);
        this.consentView = consentForm[0];

        var learningStyleForm = this.getLearningStyleFormByFilter(client.userID);
        this.learningStyleView = learningStyleForm[0];
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

    statusReport(event) {
        this.clientView = null;
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
            }
        } catch (err) {
            this.data = this.allClients;
        }
    }

    chartHovered(e: any): void {

    }

    createAsStudent(client: Student) {
      this.studentService
          .save(client)
          .then(result => {
            console.log(result);
            this.removeAlert(client);
          })
          .catch(error => this.error = error); // TODO: Display error message
    }

    removeAlert(client) {
      swal({
          title: 'Transfer client (' + client.firstName + ' ' + client.lastName + ')?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, transfer it!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.removeFromClientTable(client.userID);
        }
      });
    }

    removeFromClientTable(userID): void {
      event.stopPropagation();
      this.clientService
          .removeFromClientTable(userID)
          .then(res => {
              this.data = this.data.filter(h => h.userID !== userID);
              this.stage3 = this.data.filter(x => x.userID !== userID && !x.suitability && !x.consent && !x.learningStyle);
              this.doughnutChartData = [this.stage1.length, this.stage2.length, this.stage3.length];
              swal(
                  'Transfered',
                  'Client record has been transfered to the student table.',
                  'success'
              );
              this.clientTotal = this.data.length;
          })
          .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
