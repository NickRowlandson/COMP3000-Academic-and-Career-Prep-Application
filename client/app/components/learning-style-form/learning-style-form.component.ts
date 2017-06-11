import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LearningStyleForm } from "../../models/learningStyleForm";
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'learningStyleForm',
    templateUrl: './app/components/learning-style-form/learning-style-form.component.html',
    styleUrls: ['./app/components/learning-style-form/learning-style-form.component.css']
})

export class LearningStyleComponent {
  @Input() learningStyleForm: LearningStyleForm;
  error: any;
  totalSeeingPoints: number;
  totalHearingPoints: number;
  totalDoingPoints: number;

  constructor(private clientService: ClientService, private router: Router, private authService: AuthService) {
    this.learningStyleForm = new LearningStyleForm();
  }
  saveLearningStyle() {
    this.clientService
        .saveLearningStyle(this.learningStyleForm)
        .then(client => {
            this.router.navigate(['/dashboard']);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  tallyPoints() {
    var seeingPoints = 0;
    var hearingPoints = 0;
    var doingPoints = 0;

    if (this.learningStyleForm.seeing1) { seeingPoints++; }
    if (this.learningStyleForm.seeing2) { seeingPoints++; }
    if (this.learningStyleForm.seeing3) { seeingPoints++; }
    if (this.learningStyleForm.seeing4) { seeingPoints++; }
    if (this.learningStyleForm.seeing5) { seeingPoints++; }
    if (this.learningStyleForm.seeing6) { seeingPoints++; }
    if (this.learningStyleForm.seeing7) { seeingPoints++; }
    this.totalSeeingPoints = seeingPoints;
    this.learningStyleForm.seeing = this.totalSeeingPoints;

    if (this.learningStyleForm.hearing1) { hearingPoints++; }
    if (this.learningStyleForm.hearing2) { hearingPoints++; }
    if (this.learningStyleForm.hearing3) { hearingPoints++; }
    if (this.learningStyleForm.hearing4) { hearingPoints++; }
    if (this.learningStyleForm.hearing5) { hearingPoints++; }
    if (this.learningStyleForm.hearing6) { hearingPoints++; }
    if (this.learningStyleForm.hearing7) { hearingPoints++; }
    this.totalHearingPoints = hearingPoints;
    this.learningStyleForm.hearing = this.totalHearingPoints;

    if (this.learningStyleForm.doing1) { doingPoints++; }
    if (this.learningStyleForm.doing2) { doingPoints++; }
    if (this.learningStyleForm.doing3) { doingPoints++; }
    if (this.learningStyleForm.doing4) { doingPoints++; }
    if (this.learningStyleForm.doing5) { doingPoints++; }
    if (this.learningStyleForm.doing6) { doingPoints++; }
    if (this.learningStyleForm.doing7) { doingPoints++; }
    this.totalDoingPoints = doingPoints;
    this.learningStyleForm.doing = this.totalDoingPoints;
  }

  goBack() {
      window.history.back();
  }
}
