import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ClientService } from "../../services/client.service";
import { AuthService } from "../../services/authentication.service";
//import { pdfiller } from 'pdffiller';
declare var swal: any;

@Component({
    selector: 'client-status',
    templateUrl: './app/components/client-status/client-status.component.html',
    styleUrls: ['./app/components/client-status/client-status.component.css']
})

export class ClientStatusComponent implements OnInit {
    //pdffiller = new pdfiller();
    clients: Client[];
    allClients: Client[];
    suitabilityForms: SuitabilityForm[];
    clientTotal: any;
    error: any;

    clientView: Client;
    suitabilityView: SuitabilityForm;
    showGeneral: boolean = true;
    showSuitability: boolean;

    //Chart
    doughnutChartLabels: string[];
    doughnutChartData: number[];
    doughnutChartType: string;
    doughnutChartColors: any[];

    constructor(private router: Router, private clientService: ClientService, private authService: AuthService) {

    }

    ngOnInit() {
        this.getClients();
    }

    getClients() {
        this.clientService
            .getClients()
            .then(objects => {
                if (objects.status === "403") {
                    this.clients = null;
                } else {
                    this.setData(objects);
                }
            })
            .catch(error => this.error = error);
    }

    populatePRF(client) {
      console.log("generating pdf...");
        this.clientService
            .populatePRF(client.userID)
            .catch(error => console.log(error));
    }

    setData(objects) {
        this.clients = objects.clients;
        this.allClients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        var stage1 = this.clients.filter(x => x.status === '1');
        var stage2 = this.clients.filter(x => x.status === '2');
        var stage3 = this.clients.filter(x => x.status === '3');
        this.doughnutChartLabels = ['Suitability', 'Consent', 'PRF'];
        this.doughnutChartData = [stage1.length, stage2.length, stage3.length];
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];
    }

    addClient() {
        this.router.navigate(['/suitability']);
    }

    gotoEdit(client: Client, event: any) {
        this.router.navigate(['/clientEdit', client.clientID]);
    }

    showAlert(client, event) {
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
                this.clients = this.clients.filter(h => h !== client);
                swal(
                    'Deleted!',
                    'Client record has been deleted.',
                    'success'
                );
            })
            .catch(error => this.error = error);
    }

    showClientView(client: Client) {
        this.clientView = client;
        var suitabilityForm = this.getSuitabilityFormByFilter(client.userID);
        this.suitabilityView = suitabilityForm[0];
    }

    getSuitabilityFormByFilter(id) {
        return this.suitabilityForms.filter(x => x.userID === id);
    }

    sectionBtnClicked(event, section) {
        if (section === "general") {
            this.showGeneral = true;
            this.showSuitability = false;
        } else if (section === "suitability") {
            this.showGeneral = false;
            this.showSuitability = true;
        }
    }

    statusReport(event) {
        this.clientView = null;
    }

    chartClicked(e: any): void {
        try {
            var index = e.active[0]._index;
            if (index === 0) {
                this.clients = this.allClients.filter(x => x.status === '1');
            } else if (index === 1) {
                this.clients = this.allClients.filter(x => x.status === '2');
            } else if (index === 2) {
                this.clients = this.allClients.filter(x => x.status === '3');
            }
        } catch (err) {
            this.clients = this.allClients;
        }
    }

    chartHovered(e: any): void {

    }

    goBack() {
        window.history.back();
    }
}
