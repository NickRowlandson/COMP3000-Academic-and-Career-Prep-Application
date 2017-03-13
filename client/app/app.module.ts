import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManageComponent } from './components/userManage/user-manage.component';
import { UserEditComponent } from './components/userEdit/user-edit.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent } from './components/studentEdit/student-edit.component';
import { StudentListComponent } from './components/studentList/student-list.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { StudentService } from './services/student.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
    ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserManageComponent,
    UserEditComponent,
    StudentManageComponent,
    StudentEditComponent,
    StudentListComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    StudentService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
