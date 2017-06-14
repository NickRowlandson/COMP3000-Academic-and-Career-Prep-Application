import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DataTableModule } from 'angular2-datatable';

//Import components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffManageComponent } from './components/staff-manage/staff-manage.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
import { StudentManageComponent } from './components/student-manage/student-manage.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { ClientStatusComponent } from './components/client-status/client-status.component';
import { SuitabilityFormComponent } from './components/suitability-form/suitability-form.component';
import { ConsentFormComponent } from './components/consent-form/consent-form.component';
import { CaseNotesComponent } from './components/case-notes/case-notes.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { PrfFormComponent } from './components/prf-form/prf-form.component';
import { LearningStyleComponent } from './components/learning-style-form/learning-style-form.component';

//Import pipes
import { DataFilterPipe } from "./pipes/data-filter.pipe";

//Import services
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';
import { StudentGuard } from './guards/student.guard';
import { ClientGuard } from './guards/client.guard';
import { AuthService } from './services/authentication.service';
import { StudentService } from './services/student.service';
import { ClientService } from './services/client.service';
import { StaffService } from './services/staff.service';
import { CourseService } from './services/course.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ChartsModule,
    DataTableModule
    ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    StaffManageComponent,
    StaffEditComponent,
    StudentManageComponent,
    StudentEditComponent,
    ClientStatusComponent,
    SuitabilityFormComponent,
    ConsentFormComponent,
    CaseNotesComponent,
    CourseManageComponent,
    PrfFormComponent,
    LearningStyleComponent,
    DataFilterPipe
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    StaffGuard,
    StudentGuard,
    ClientGuard,
    AuthService,
    StudentService,
    StaffService,
    ClientService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
