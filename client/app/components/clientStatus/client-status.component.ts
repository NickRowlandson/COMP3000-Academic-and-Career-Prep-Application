import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";
import { AuthService } from "../../services/authentication.service";

@Component({
    selector: 'client-status',
    templateUrl: './app/components/clientStatus/client-status.component.html',
    styleUrls: ['./app/components/clientStatus/client-status.component.css']
})

export class ClientStatusComponent implements OnInit {
  clients: Client[];
  clientTotal: any;
  error: any;
  clientView: Client;
  doughnutChartLabels:string[] = ['Stage 1', 'Stage 2', 'Stage 3'];
  doughnutChartData:number[] = [350, 450, 100];
  doughnutChartType:string = 'doughnut';
  doughnutChartColors: any[] = [{ backgroundColor: ["#FF4207", "#F8E903", "#2AD308"] }];

  constructor(private router: Router, private clientService: ClientService, private authService: AuthService) {

  }

  ngOnInit() {
      this.getClients();
  }

  getClients() {
    this.clientService
      .getClients()
      .then(clients => {
        if (clients.status === "403") {
          this.clients = null;
        } else {
            this.setData(clients);
        }
      })
      .catch(error => this.error = error);
  }

   setData(clients) {
      this.clients = clients;
      this.clientTotal = clients.length;
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

  showView(client: Client) {
    this.clientView = client;
  }

  chartClicked(e:any):void {

  }

  chartHovered(e:any):void {

  }

  goBack() {
      window.history.back();
  }
}
