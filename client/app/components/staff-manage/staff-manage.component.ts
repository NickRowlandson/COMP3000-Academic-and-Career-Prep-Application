import { Component, OnInit } from '@angular/core';
import { StaffService } from "../../services/staff.service";
import { User } from "../../models/user";
import { Router } from '@angular/router';
declare var swal: any;


@Component({
    selector: 'staff-manage',
    templateUrl: './app/components/staff-manage/staff-manage.component.html',
    styleUrls: ['./app/components/staff-manage/staff-manage.component.css']
})


export class StaffManageComponent implements OnInit {
    users: User[];
    usersBackup: User[];
    error: any;
    usersLength: any;
    adminNumber: any;
    staffNumber: any;
    instructorNumber: any;

    constructor(private router: Router, private staffService: StaffService) {

    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.staffService
          .getUsers()
          .then(users => {
            if (users.status === "403") {
              this.users = null;
            } else {
              this.users = users;
              for (let user of this.users) {
                user.fullName = user.firstName + " " + user.lastName;
              }
              this.usersBackup = this.users;
              this.usersLength = users.length;
              this.updateStats();
            }
          })
          .catch(error => this.error = error);
    }

    gotoEdit(user: User, event: any) {
        this.router.navigate(['/staff-edit', user.staffID]);
    }

    addUser() {
        this.router.navigate(['/staff-edit', 'new']);
    }

    deleteAlert(user: User, event: any) {
        swal({
            title: 'Delete user (' + user.firstName + ' ' + user.lastName + ')?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then(isConfirm => {
          if (isConfirm) {
            this.deleteUser(user, event);
          }
        }).catch(error => {
          //console.log("Canceled");
        });
    }

    deleteUser(user: User, event: any) {
        event.stopPropagation();
        this.staffService
          .delete(user)
          .then(res => {
              this.users = this.users.filter(h => h !== user);
              this.usersBackup = this.users;
              this.usersLength = this.users.length;
              this.updateStats();
              swal(
                  'Deleted!',
                  'User has been deleted.',
                  'success'
              );
          })
          .catch(error => this.error = error);
    }

    updateStats() {
      this.adminNumber = this.users.filter(x => x.userType === "Admin");
      this.adminNumber = this.adminNumber.length;
      this.staffNumber = this.users.filter(x => x.userType === "Staff");
      this.staffNumber = this.staffNumber.length;
      this.instructorNumber = this.users.filter(x => x.userType === "Instructor");
      this.instructorNumber = this.instructorNumber.length;
    }

    filterStaff(userType) {
      this.users = this.usersBackup;
      if (userType === 'total') {
        this.users = this.usersBackup;
      } else {
        this.users = this.users.filter(x => x.userType === userType);
      }
    }

    goBack() {
        window.history.back();
    }
}
