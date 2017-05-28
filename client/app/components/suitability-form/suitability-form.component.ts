import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from "../../models/client";
import { SuitabilityForm } from "../../models/suitabilityForm";
import { ActivatedRoute, Params } from '@angular/router';
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'suitabilityForm',
    templateUrl: './app/components/suitability-form/suitability-form.component.html',
    styleUrls: ['./app/components/suitability-form/suitability-form.component.css']
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
  showSection5 = false;
  showSection6 = false;

  showSectionBtn1 = true;
  showSectionBtn2 = false;
  showSectionBtn3 = false;
  showSectionBtn4 = false;
  showSectionBtn5 = false;
  showSectionBtn6 = false;

  partAPoints = 0;
  partBPoints = 0;
  totalPoints = 0;

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
        this.showSection5 = false;
        this.showSection6 = false;
        break;
      case 'section2':
        this.showSection1 = false;
        this.showSection2 = true;
        this.showSection3 = false;
        this.showSection4 = false;
        this.showSection5 = false;
        this.showSection6 = false;
        break;
      case 'section3':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = true;
        this.showSection4 = false;
        this.showSection5 = false;
        this.showSection6 = false;
        break;
      case 'section4':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = true;
        this.showSection5 = false;
        this.showSection6 = false;
        break;
      case 'section5':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
        this.showSection5 = true;
        this.showSection6 = false;
        break;
      case 'section6':
        this.showSection1 = false;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
        this.showSection5 = false;
        this.showSection6 = true;
        this.tallyPoints();
        break;
      default:
        this.showSection1 = true;
        this.showSection2 = false;
        this.showSection3 = false;
        this.showSection4 = false;
        this.showSection5 = false;
        this.showSection6 = false;
    }
  }

  tallyPoints(){
    var factorPoints = 0;
    this.partAPoints = 0;
    this.partBPoints = 0;
    this.totalPoints = 0;

    // PART A
    if(this.suitabilityForm.offerStartDate == '< 1 year'){this.partAPoints += 3;}
    else if(this.suitabilityForm.offerStartDate == '1 year'){this.partAPoints += 2;}
    else if(this.suitabilityForm.offerStartDate == '> 1 year'){this.partAPoints += 1;}

    if(this.suitabilityForm.meetsGoal == 'no'){this.partAPoints += 3;}
    else if(this.suitabilityForm.meetsGoal == 'lacking'){this.partAPoints += 2;}
    else if(this.suitabilityForm.meetsGoal == 'yes'){this.partAPoints += 1;}

    if(this.suitabilityForm.timeOutOfSchool == '6+'){this.partAPoints += 3;}
    else if(this.suitabilityForm.timeOutOfSchool == '1-6'){this.partAPoints += 2;}
    else if(this.suitabilityForm.timeOutOfSchool == '<1'){this.partAPoints += 1;}

    if(this.suitabilityForm.inProgramBefore == 'no'){this.partAPoints += 3;}
    else if(this.suitabilityForm.inProgramBefore == 'yesWithApp'){this.partAPoints += 2;}
    else if(this.suitabilityForm.inProgramBefore == 'yes'){this.partAPoints += 1;}

    if(this.suitabilityForm.employment == 'no'){this.partAPoints += 3;}
    else if(this.suitabilityForm.employment == 'part'){this.partAPoints += 2;}
    else if(this.suitabilityForm.employment == 'full'){this.partAPoints += 1;}

    if(this.suitabilityForm.incomeSource == 'no'){this.partAPoints += 3;}
    else if(this.suitabilityForm.incomeSource == 'noInc'){this.partAPoints += 2;}
    else if(this.suitabilityForm.incomeSource == 'yes'){this.partAPoints += 1;}

    if(this.suitabilityForm.ageRange == '45-65'){this.partAPoints += 3;}
    else if(this.suitabilityForm.ageRange == '19-29'){this.partAPoints += 2;}
    else if(this.suitabilityForm.ageRange == '30-44'){this.partAPoints += 1;}

    //PART B
    if(this.suitabilityForm.hoursPerWeek == '10-20'){this.partBPoints += 3;}
    else if(this.suitabilityForm.hoursPerWeek == '5-10'){this.partBPoints += 2;}
    else if(this.suitabilityForm.hoursPerWeek == '<5'){this.partBPoints += 1;}

    if(this.suitabilityForm.factorHealth == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorInstructions == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorCommunication == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorLanguage == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorComputer == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorHousing == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorTransportation == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorDaycare == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorInternet == 'true'){factorPoints++;}
    if(this.suitabilityForm.factorPersonal == 'true'){factorPoints++;}

    if(factorPoints >= 0 && factorPoints <= 4){this.partBPoints += 3;}
    else if(factorPoints > 4 && factorPoints <= 8){this.partBPoints += 2;}
    else if(factorPoints > 8){this.partBPoints += 1;}

    this.totalPoints = this.partAPoints + this.partBPoints;
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
      case 'section5':
        this.showSectionBtn5 = true;
        this.clicked(event, nextSection);
        break;
      case 'section6':
        this.showSectionBtn6 = true;
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
