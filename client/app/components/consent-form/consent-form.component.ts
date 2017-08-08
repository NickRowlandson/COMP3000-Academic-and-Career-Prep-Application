import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConsentForm } from "../../models/consentForm";
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'consentForm',
    templateUrl: './app/components/consent-form/consent-form.component.html',
    styleUrls: ['./app/components/consent-form/consent-form.component.css']
})


export class ConsentFormComponent {
  @Input() consentForm: ConsentForm;
  error: any;
  date: any;
  phoneNumber: any;
  clientName: any;

  constructor(private clientService: ClientService, private router: Router, private authService: AuthService) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var userID = currentUser.userID;

      this.clientService
      .getClient(userID)
      .then(result => {
        this.phoneNumber = result.client[0].phone;
        this.clientName = result.client[0].firstName + " " + result.client[0].lastName;
      })
      .catch(err => this.error = err);

      this.consentForm = new ConsentForm();
      this.date = new Date();
  }

  saveConsent() {
    this.consentForm.date = this.date;
    this.clientService
        .saveConsent(this.consentForm)
        .then(client => {
            this.router.navigate(['/dashboard']);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack() {
      window.history.back();
  }
}
