import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'learningStyleForm',
    templateUrl: './app/components/learning-style-form/learning-style-form.component.html',
    styleUrls: ['./app/components/learning-style-form/learning-style-form.component.css']
})

export class LearningStyleComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }
}
