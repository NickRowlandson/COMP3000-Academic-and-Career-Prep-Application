import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication.service';
import { Client } from "../../models/client";
import { ClientService } from "../../services/client.service";

@Component({
    selector: 'dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    client: Client[];

    consentForm: boolean;
    learningStyleForm: boolean;

    //variables used to toggle dahsboard items
    clientStatus = false;
    manageStudents = false;
    manageStaff = false;
    suitability = false;
    consent = false;
    manageCourses = false;
    caseNotes = false;
    learningStyle = false;
    maesdprf = false;
    timetable = false;
    attendanceList = false;
    attendanceReport = false;

    userType: any;

    constructor(private router: Router, private authService: AuthService, private clientService: ClientService) {

    }

    ngOnInit() {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var userType = currentUser.userType;
        var userID = currentUser.userID;
        this.checkAuth(userType, userID);
    }

    checkAuth(userType, userID) {
        this.userType = userType;
        if (userType === 'Admin') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.manageStaff = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
        } else if (userType === 'Staff') {
            this.clientStatus = true;
            this.manageStudents = true;
            this.suitability = true;
            this.caseNotes = true;
            this.manageCourses = true;
            this.attendanceReport = true;
        } else if (userType === 'Student') {
            this.timetable = true;
        } else if (userType === 'Client') {
            this.consent = true;
            this.learningStyle = true;
            this.maesdprf = true;
            this.checkFormStatus(userID);
        } else if (userType === 'Instructor') {
            this.attendanceList = true;
            this.attendanceReport = true;
            this.caseNotes = true;
        }
    }

    checkFormStatus(userID) {
        this.clientService
            .getClient(userID)
            .then(object => {
                if (object.status === "403") {
                    this.client = null;
                    console.log("Error");
                } else {
                    this.client = object.client[0].firstName;
                    this.consentForm = object.client[0].consent;
                    this.learningStyleForm = object.client[0].learningStyle;
                }
            })
            .catch(error => console.log(error));
    }
}
