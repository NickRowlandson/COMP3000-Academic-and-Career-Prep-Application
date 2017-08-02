import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
declare var moment: any;

@Component({
  selector: 'attendanceReportComponet',
  templateUrl: './app/components/attendance-report/attendance-report.component.html',
  styleUrls: ['./app/components/attendance-report/attendance-report.component.css']
})

export class AttendanceReportComponent implements OnInit {
  data: any;
  courses: Course[];
  students: Student[];
  totalAbsences: any;

  studentAttendanceView: boolean = false;
  absences: any[];
  student: any[];
  missedClasses = [];
  totalStudentAbsences: any;
  noAbsences: boolean = false;

  constructor(private router: Router, private studentService: StudentService, private courseService: CourseService) {

  }

  ngOnInit() {
    this.studentService
    .getAllAttendance()
    .then(attendance => {
      if (attendance.status === "403") {
        this.data = null;
      } else {
        this.data = attendance;
        this.totalAbsences = this.data.length;
        this.getStudents();
      }
    })
    .catch(error => console.log(error));
  }

  getStudents() {
    this.studentService
      .getStudents()
      .then(students => {
        if (students.status === "403") {
          this.students = null;
        } else {
          this.students = students;
        }
        this.getCourses();
      })
      .catch(error => console.log(error));
  }

  getCourses() {
      this.courseService
          .getCourses()
          .then(result => {
              if (result.status === "403") {
                  this.courses = null;
              } else {
                  //format datetime
                  result.forEach((item) => {
                      item.courseStart = moment(item.courseStart).format('YYYY-MM-DD');
                      item.courseEnd = moment(item.courseEnd).format('YYYY-MM-DD');
                      item.classStartTime = moment(item.classStartTime).format('hh:mm A');
                      item.classEndTime = moment(item.classEndTime).format('hh:mm A');
                  });
                  this.courses = result;
              }

          })
          .catch(error => console.log(error));
  }

  viewReport(student: Student) {
    this.missedClasses = [];
    this.studentAttendanceView = true;
    this.absences = this.data.filter(x => x.userID === student.studentID);
    this.student = this.students.filter(x => x.studentID === student.studentID);
    this.student = this.student[0];
    this.totalStudentAbsences = this.absences.length;

    if (this.totalStudentAbsences === 0) {
      this.noAbsences = true;
    } else {
      this.noAbsences = false;
      for (let item of this.absences) {
        var course = this.courses.filter(x => x.courseID === item.CourseID);
        var missedClass = {
          course: course,
          date: item.Date
        };
        this.missedClasses.push(missedClass);
      }
    }

  }

  overallStatus() {
    this.studentAttendanceView = false;
    this.noAbsences = false;
  }

  goBack() {
    window.history.back();
  }
}
