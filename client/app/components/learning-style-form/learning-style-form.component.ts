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

  goBack() {
      window.history.back();
  }
}
