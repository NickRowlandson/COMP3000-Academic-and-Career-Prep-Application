import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { ActivatedRoute, Params } from '@angular/router';
import { StaffService } from "../../services/staff.service";
declare var swal: any;

@Component({
    selector: 'staff-edit',
    templateUrl: './app/components/staff-edit/staff-edit.component.html',
    styleUrls: ['./app/components/staff-edit/staff-edit.component.css']
})

export class StaffEditComponent implements OnInit {
    @Input() user: User;
    newUser = false;
    error: any;
    navigated = false; // true if navigated here


    constructor(private staffService: StaffService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            if (id === 'new') {
                this.newUser = true;
                this.user = new User();
            } else {
                this.newUser = false;
                this.staffService.getUser(id).then(user => this.user = user);
            }
        });
    }

    save() {
      if (this.user.email
        && this.user.firstName
        && this.user.lastName
        && this.user.password
        && this.user.username
        && this.user.authLevel) {
          this.staffService
              .save(this.user)
              .then(user => {
                if (user.error === "username in use") {
                  swal(
                      'Username taken',
                      'Please enter a differnet username.',
                      'warning'
                  );
                } else if (user.error === "incorrect email format") {
                  swal(
                      'Incorrect email format',
                      'Please enter a proper email.',
                      'warning'
                  );
                }  else if (user.success === "success") {
                  this.goBack();
                } else {
                  this.user = user; // saved user, w/ id if new
                  this.goBack();
                }
              })
              .catch(error => this.error = error); // TODO: Display error message
      } else {
        swal(
            'Missing Input',
            'Please enter all information before saving.',
            'warning'
        );
      }

    }

    goBack() {
        window.history.back();
    }
}
