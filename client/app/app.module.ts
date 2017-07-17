import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DataTableModule } from 'angular2-datatable';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { ScheduleModule } from 'primeng/primeng';

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
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { PrfFormComponent } from './components/prf-form/prf-form.component';
import { LearningStyleComponent } from './components/learning-style-form/learning-style-form.component';
import { StudentEnrollmentComponent } from './components/student-enrollment/student-enrollment.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { VisviewComponent } from './components/visview/visview.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';

//Import pipes
import { UserFilterPipe } from "./pipes/user-filter.pipe";
import { CourseFilterPipe } from "./pipes/course-filter.pipe";

//Import services
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';
import { StudentGuard } from './guards/student.guard';
import { ClientGuard } from './guards/client.guard';
import { InstructorGuard } from './guards/instructor.guard';
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
    DataTableModule,
    NKDatetimeModule,
    ScheduleModule
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
    CourseEditComponent,
    PrfFormComponent,
    LearningStyleComponent,
    StudentEnrollmentComponent,
    TimetableComponent,
    UserFilterPipe,
    CourseFilterPipe,
    VisviewComponent,
    AttendanceListComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    StaffGuard,
    StudentGuard,
    ClientGuard,
    InstructorGuard,
    AuthService,
    StudentService,
    StaffService,
    ClientService,
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
