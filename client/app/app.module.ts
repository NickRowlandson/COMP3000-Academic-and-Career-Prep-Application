import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { StudentsComponent }      from './components/students/students.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StudentDetailComponent }  from './components/studentDetail/student-detail.component';

import { StudentService }  from './services/student.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    StudentsComponent,
    DashboardComponent,
    StudentDetailComponent
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
