import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";
declare var swal: any;

@Component({
  selector: 'caseNotes',
  templateUrl: './app/components/case-notes/case-notes.component.html',
  styleUrls: ['./app/components/case-notes/case-notes.component.css']
})

export class CaseNotesComponent implements OnInit {
  data: any[];
  notes: any[];
  notesView: Student;
  note: any;
  newNote: boolean;
  status: any;
  error: any;

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
          for (let student of this.data) {
            student.fullName = student.firstName + " " + student.lastName;
          }
        }
      })
      .catch(error => this.error = error);
  }

  saveNote(studentID) {
    console.log(this.note);
    this.studentService
        .saveNewNote(this.note, studentID)
        .then(note => {
            this.note = '';
            this.showNotes(studentID);
        })
        .catch(error => this.error = error); // TODO: Display error message

    this.newNote = false;
  }

  showCaseNotes(student: Student) {
    this.notesView = student;
    this.showNotes(student.studentID);
  }

  showNotes(studentID) {
    this.studentService
        .getNotes(studentID)
        .then(notes => {
          this.notes = notes;
        })
        .catch(error => console.log(error));
  }

  deleteNote(noteID) {
      event.stopPropagation();
      this.studentService
          .deleteNote(noteID)
          .then(res => {
              this.notes = this.notes.filter(h => h.caseNoteID !== noteID);
              swal(
                  'Deleted!',
                  'Case note has been successfully removed.',
                  'success'
              );
          })
          .catch(error => this.error = error);
  }

  deleteAlert(noteID) {
      swal({
          title: 'Delete note?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then(isConfirm => {
        if (isConfirm) {
          this.deleteNote(noteID);
        }
      }).catch(error => {
        //console.log("Canceled");
      });
  }

  goBack() {
    window.history.back();
  }
}
