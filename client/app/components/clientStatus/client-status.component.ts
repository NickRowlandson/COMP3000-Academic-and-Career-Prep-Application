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
  error: any;
  clientView: Client;

  constructor(private router: Router, private clientService: ClientService, private authService: AuthService) {

  }

  ngOnInit() {
      this.getData();
  }

  getData() {
    this.clientService.getClients()
    .then(data =>
      this.clients = data
    );
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

  goBack() {
      window.history.back();
  }
}
