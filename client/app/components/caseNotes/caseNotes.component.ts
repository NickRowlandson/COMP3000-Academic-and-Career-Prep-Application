import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'caseNotes',
    templateUrl: './app/components/caseNotes/caseNotes.component.html',
    styleUrls: ['./app/components/caseNotes/caseNotes.component.css']
})

export class CaseNotesComponent implements OnInit {

    constructor(private router: Router) {

    }

    ngOnInit() {

    }

    goBack() {
        window.history.back();
    }
}
