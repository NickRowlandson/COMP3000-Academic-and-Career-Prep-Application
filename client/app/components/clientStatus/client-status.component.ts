import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ClientService } from "../../services/client.service";
import { AuthService } from "../../services/authentication.service";

@Component({
    selector: 'client-status',
    templateUrl: './app/components/clientStatus/client-status.component.html',
    styleUrls: ['./app/components/clientStatus/client-status.component.css']
})

export class ClientStatusComponent implements OnInit {
    clients: Client[];
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

    setData(objects) {
        this.clients = objects.clients;
        this.clientTotal = objects.clients.length;
        this.suitabilityForms = objects.suitabilityForms;
        var stage1 = this.clients.filter(x => x.status === '1');
        var stage2 = this.clients.filter(x => x.status === '2');
        var stage3 = this.clients.filter(x => x.status === '3');
        this.doughnutChartLabels = ['Stage 1', 'Stage 2', 'Stage 3'];
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

    deleteClient(client: Client, event: any) {
        event.stopPropagation();
        this.clientService
            .delete(client)
            .then(res => {
                this.clients = this.clients.filter(h => h !== client);
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

    chartClicked(e: any): void {

    }

    chartHovered(e: any): void {

    }

    goBack() {
        window.history.back();
    }
}
