import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from "../../models/student";
import { StudentService } from "../../services/student.service";
import { AuthService } from "../../services/authentication.service";

@Component({
    selector: 'client-status',
    templateUrl: './app/components/clientStatus/client-status.component.html',
    styleUrls: ['./app/components/clientStatus/client-status.component.css']
})

export class ClientStatusComponent implements OnInit {
    students: Student[];
    clients = [];
    studentView: Student;

    constructor(private router: Router, private studentService: StudentService, private authService: AuthService) {

    }

    ngOnInit() {
      this.getData();
    }

    getData() {
      this.studentService.getStudents()
      .then(data =>
        this.getClients(data)
      );
    }

    getClients(data) {
      for (let client of data) {
        this.authService.getAuthLevel(client.userID)
        .then(data =>
          this.addToTable(data.authLevel, client)
        );
      }
    }

    addToTable(authLevel, client) {
      if (authLevel === 'client') {
        this.clients.push(client);
      }
    }

    showView(student: Student) {
      this.studentView = student;
    }

    goBack() {
        window.history.back();
    }
}
