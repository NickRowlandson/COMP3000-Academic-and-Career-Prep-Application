import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/charts/charts';
//import { Pdffiller } from 'pdffiller';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

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

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ChartsModule
    //Pdffiller
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
    CourseManageComponent
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
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
