import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { StudentManageComponent }      from './components/studentManage/student-manage.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StudentEditComponent }  from './components/studentEdit/student-edit.component';
import { StudentListComponent }  from './components/studentList/student-list.component';
import { StudentViewComponent }  from './components/studentView/student-view.component';

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
    StudentManageComponent,
    DashboardComponent,
    StudentEditComponent,
    StudentListComponent,
    StudentViewComponent
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
