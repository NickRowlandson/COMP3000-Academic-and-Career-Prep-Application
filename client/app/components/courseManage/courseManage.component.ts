import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'courseManage',
    templateUrl: './app/components/courseManage/courseManage.component.html',
    styleUrls: ['./app/components/courseManage/courseManage.component.css']
})

export class CourseManageComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }

    goBack() {
        window.history.back();
    }
}
