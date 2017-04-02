import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: 'dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    clientStatus = false;
    manageStudents = false;
    manageStaff = false;
    suitability = false;
    dashboardItem5 = false;
    dashboardItem6 = false;

    constructor(private router: Router, private authService: AuthService) {

    }

    ngOnInit() {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var userType = currentUser.userType;
      this.checkAuth(userType);
    }

    checkAuth(userType) {
        if (userType === 'Admin') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.dashboardItem5 = true;
            this.dashboardItem6 = true;
        } else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = false;
            this.suitability = true;
            this.dashboardItem5 = true;
            this.dashboardItem6 = true;
        } else if (userType === 'Student') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.dashboardItem5 = false;
            this.dashboardItem6 = false;
        } else if (userType === 'Client') {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.dashboardItem5 = false;
            this.dashboardItem6 = false;
        } else {
            this.clientStatus = false;
            this.manageStudents = false;
            this.manageStaff = false;
            this.suitability = false;
            this.dashboardItem5 = false;
            this.dashboardItem6 = false;
        }
    }
}
