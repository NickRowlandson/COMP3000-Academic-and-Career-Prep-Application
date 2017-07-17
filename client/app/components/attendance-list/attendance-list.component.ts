import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'attendanceList',
    templateUrl: './app/components/attendance-list/attendance-list.component.html',
    styleUrls: ['./app/components/attendance-list/attendance-list.component.css']
})

export class AttendanceListComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }

    goBack() {
        window.history.back();
    }
}
