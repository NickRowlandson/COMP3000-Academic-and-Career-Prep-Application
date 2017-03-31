import { Component, OnInit } from '@angular/core';
import { StaffService } from "../../services/staff.service";
import { User } from "../../models/user";
import { Router } from '@angular/router';

@Component({
    selector: 'staff-manage',
    templateUrl: './app/components/staffManage/staff-manage.component.html',
    styleUrls: ['./app/components/staffManage/staff-manage.component.css']
})


export class StaffManageComponent implements OnInit {
    users: User[];
    error: any;

    constructor(private router: Router, private userService: StaffService) {

    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService
          .getUsers()
          .then(users => {
            if (users.status === "403") {
              this.users = null;
            } else {
              this.users = users;
            }
          })
          .catch(error => this.error = error);
    }

    gotoEdit(user: User, event: any) {
        this.router.navigate(['/staffEdit', user.staffID]);
    }

    addUser() {
        this.router.navigate(['/staffEdit', 'new']);
    }

    deleteUser(user: User, event: any) {
        event.stopPropagation();
        this.userService
          .delete(user)
          .then(res => {
              this.users = this.users.filter(h => h !== user);
          })
          .catch(error => this.error = error);
    }

    goBack() {
        window.history.back();
    }
}
