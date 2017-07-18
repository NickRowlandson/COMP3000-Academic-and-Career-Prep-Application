import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";

@Component({
  selector: 'caseNotes',
  templateUrl: './app/components/case-notes/case-notes.component.html',
  styleUrls: ['./app/components/case-notes/case-notes.component.css']
})

export class CaseNotesComponent implements OnInit {
  data: any[];
  notesView: Student;
  note: any;

  constructor(private router: Router, private studentService: StudentService) {

  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService
      .getStudents()
      .then(students => {
        if (students.status === "403") {
          this.data = null;
        } else {
          this.data = students;
        }
      })
      .catch(error => this.error = error);
  }

  addCaseNotes() {
    console.log('Adding Case Note');
    this.newNote = true;
  }

  saveNote(studentID) {
    console.log(this.note);
    this.studentService
        .saveNewNote(this.note, studentID)
        .then(note => {
            this.note = note;
            this.goBack();
        })
        .catch(error => this.error = error); // TODO: Display error message

    this.newNote = false;
  }

  showCaseNotes(student: Student) {
    this.notesView = student;
  }

  goBack() {
    window.history.back();
  }
}
