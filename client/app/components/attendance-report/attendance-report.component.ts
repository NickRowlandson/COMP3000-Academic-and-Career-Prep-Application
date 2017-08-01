import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";

@Component({
  selector: 'attendanceReportComponet',
  templateUrl: './app/components/attendance-report/attendance-report.component.html',
  styleUrls: ['./app/components/attendance-report/attendance-report.component.css']
})

export class AttendanceReportComponent implements OnInit {
  data: any[];

  constructor(private router: Router, private studentService: StudentService) {

  }

  ngOnInit() {
  
  }

  goBack() {
    window.history.back();
  }
}
