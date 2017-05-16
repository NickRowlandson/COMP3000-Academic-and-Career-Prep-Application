import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'consentForm',
    templateUrl: './app/components/consent-form/consent-form.component.html',
    styleUrls: ['./app/components/consent-form/consent-form.component.css']
})

export class ConsentFormComponent {
  goBack() {
      window.history.back();
  }
}
