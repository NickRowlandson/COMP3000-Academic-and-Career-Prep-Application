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
  student: any[];
  attendance: any[];
  records = [];
  totalPresent: any;
  totalAbsent: any;
  totalMadeContact: any;
  noAttendance: boolean = false;

  studentReport: boolean = false;

  courseAttendanceView: boolean = false;
  course: any;

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

  viewStudentReport(student: Student) {
    this.records = [];
    this.studentAttendanceView = true;
    this.attendance = this.data.filter(x => x.studentID === student.studentID);
    this.student = this.students.filter(x => x.studentID === student.studentID);
    this.student = this.student[0];
    this.totalPresent = this.attendance.filter(x => x.attendanceValue === 'P').length;
    this.totalAbsent = this.attendance.filter(x => x.attendanceValue === 'A').length;
    this.totalMadeContact = this.attendance.filter(x => x.attendanceValue === 'MC').length;

    if (this.attendance.length === 0) {
      this.noAttendance = true;
    } else {
      this.noAttendance = false;
      for (let item of this.attendance) {
        var course = this.courses.filter(x => x.courseID === item.courseID);
        var attendance = {
          course: course,
          date: item.date,
          attendanceValue: item.attendanceValue
        };
        this.records.push(attendance);
      }
    }

  }

  viewCourseReport(course: Course) {
    this.courseAttendanceView = true;
    this.course = course;
  }

  overallStatus() {
    this.courseAttendanceView = false;
    this.studentAttendanceView = false;
    this.noAttendance = false;
  }

  goBack() {
    window.history.back();
  }
}
