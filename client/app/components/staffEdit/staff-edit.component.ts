import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { ActivatedRoute, Params } from '@angular/router';
import { StaffService } from "../../services/staff.service";

@Component({
    selector: 'staff-edit',
    templateUrl: './app/components/staffEdit/staff-edit.component.html',
    styleUrls: ['./app/components/staffEdit/staff-edit.component.css']
})

export class StaffEditComponent implements OnInit {
    @Input() user: User;
    newUser = false;
    error: any;
    navigated = false; // true if navigated here


    constructor(private userService: StaffService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];
            console.log(id);
            if (id === 'new') {
                this.newUser = true;
                this.user = new User();
            } else {
                this.newUser = false;
                this.userService.getUser(id).then(user => this.user = user);
                console.log(this.user);
            }
        });
    }

    save() {
        this.userService
            .save(this.user)
            .then(user => {
                this.user = user; // saved user, w/ id if new
                this.goBack();
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack() {
        window.history.back();
    }
}
