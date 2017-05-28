import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'prfForm',
    templateUrl: './app/components/prf-form/prf-form.component.html',
    styleUrls: ['./app/components/prf-form/prf-form.component.css']
})

export class PrfFormComponent {
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }
}
