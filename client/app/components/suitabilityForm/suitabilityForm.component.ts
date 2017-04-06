import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'suitabilityForm',
    templateUrl: './app/components/suitabilityForm/suitabilityForm.component.html',
    styleUrls: ['./app/components/suitabilityForm/suitabilityForm.component.css']
})

export class SuitabilityFormComponent {
  @Input() client: Client;
  @Input() suitabilityForm: SuitabilityForm;
  error: any;
  date: any;
  currentUser:any;
  navigated = false; // true if navigated here
  showSection1 = true;
  showSection2 = false;
  showSection3 = false;
  showSection4 = false;

  showSectionBtn1 = true;
  showSectionBtn2 = false;
  showSectionBtn3 = false;
  showSectionBtn4 = false;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.client = new Client();
    this.suitabilityForm = new SuitabilityForm();
    this.date =  new Date();
  }

  ngOnInit() {

  }

  clicked(event, item) {
    switch (item) {
      case 'section1':
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
        break;
      case 'section2':
        this.showSection1 = false;
        this.showSection2 = true;
        this.showSection3 = false;
        this.showSection4 = false;
        break;
      case 'section3':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = true;
        this.showSection4 = false;
        break;
      case 'section4':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = true;
        break;
      default:
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
    }
  }

  next(event, nextSection) {
    switch (nextSection) {
      case 'section2':
        this.showSectionBtn2 = true;
        this.clicked(event, nextSection);
        break;
      case 'section3':
        this.showSectionBtn3 = true;
        this.clicked(event, nextSection);
        break;
      case 'section4':
        this.showSectionBtn4 = true;
        this.clicked(event, nextSection);
        break;
      default:
    }
  }

  save() {
      this.client["inquiryDate"] = this.date;
      this.client["username"] = this.client.firstName + this.client.lastName;
      this.client["password"] = this.client.birthday.replace(/-/g, "");
      this.clientService
          .save(this.client, this.suitabilityForm)
          .then(client => {
              this.client = client; // saved client, w/ id if new
              this.router.navigate(['/clients']);
          })
          .catch(error => this.error = error); // TODO: Display error message
  }

  goBack() {
      window.history.back();
  }
};
