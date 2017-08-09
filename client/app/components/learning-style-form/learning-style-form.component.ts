import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LearningStyleForm } from "../../models/learningStyleForm";
import { ClientService } from "../../services/client.service";
import { AuthService } from '../../services/authentication.service';
declare var swal: any;

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
  learnBy: any;
  multiChoice: any;

  constructor(private clientService: ClientService, private router: Router, private authService: AuthService) {
    this.learningStyleForm = new LearningStyleForm();
  }

  saveLearningStyle() {
    if (!this.learnBy && !this.multiChoice) {
      swal(
          'Incomplete form',
          'Please fill out the form',
          'warning'
      );
    } else if (this.multiChoice) {
      swal({
          title: 'You learn best by ' + this.multiChoice.firstChoice + ' and ' + this.multiChoice.secondChoice + '',
          text: "Is this correct?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          allowOutsideClick: false,
          confirmButtonText: 'Yes!'
      }).then(isConfirm => {
        if (isConfirm) {
          swal({
              title: 'Tie!',
              text: "Please pick one that suits you better",
              type: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#3085d6',
              allowOutsideClick: false,
              cancelButtonText: this.multiChoice.firstChoice,
              confirmButtonText: this.multiChoice.secondChoice
          }).then(isConfirm => {
            if (isConfirm) {
              this.learningStyleForm.learnBy = this.multiChoice.secondChoice;
              this.clientService
                  .saveLearningStyle(this.learningStyleForm)
                  .then(client => {
                      this.router.navigate(['/dashboard']);
                  })
                  .catch(error => this.error = error);
            }
          }).catch(error => {
            this.learningStyleForm.learnBy  = this.multiChoice.firstChoice;
            this.clientService
                .saveLearningStyle(this.learningStyleForm)
                .then(client => {
                    this.router.navigate(['/dashboard']);
                })
                .catch(error => this.error = error);
          });
        }
      }).catch(error => {

      });
    } else {
      swal({
          title: 'You learn best by ' + this.learnBy + '',
          text: "Is this correct?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Yes!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.learningStyleForm.learnBy  = this.learnBy;
          this.clientService
              .saveLearningStyle(this.learningStyleForm)
              .then(client => {
                  this.router.navigate(['/dashboard']);
              })
              .catch(error => this.error = error); // TODO: Display error message
        }
      }).catch(error => {
        //console.log("Canceled");
      });
    }

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

    if (this.totalSeeingPoints > this.totalHearingPoints && this.totalSeeingPoints > this.totalDoingPoints) {
      this.multiChoice = null;
      this.learnBy = "Seeing";
    } else if (this.totalHearingPoints > this.totalSeeingPoints && this.totalHearingPoints > this.totalDoingPoints) {
      this.multiChoice = null;
      this.learnBy = "Hearing";
    } else if (this.totalDoingPoints > this.totalHearingPoints && this.totalDoingPoints > this.totalSeeingPoints) {
      this.multiChoice = null;
      this.learnBy = "Doing";
    } else if (this.totalDoingPoints === this.totalSeeingPoints) {
      this.learnBy = null;
      this.multiChoice = {
        firstChoice: 'Doing',
        secondChoice: 'Seeing'
      };
    } else if (this.totalDoingPoints === this.totalHearingPoints) {
      this.learnBy = null;
      this.multiChoice = {
        firstChoice: 'Doing',
        secondChoice: 'Hearing'
      };
    } else if (this.totalSeeingPoints === this.totalHearingPoints) {
      this.learnBy = null;
      this.multiChoice = {
        firstChoice: 'Seeing',
        secondChoice: 'Hearing'
      };
    }

  }

  goBack() {
      window.history.back();
  }
}
