import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'consentForm',
    templateUrl: './app/components/consentForm/consentForm.component.html',
    styleUrls: ['./app/components/consentForm/consentForm.component.css']
})

export class ConsentFormComponent {
  goBack() {
      window.history.back();
  }
}
