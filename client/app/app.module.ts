import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ChartsModule} from 'ng2-charts/charts/charts';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

//Import components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffManageComponent } from './components/staffManage/staff-manage.component';
import { StaffEditComponent } from './components/staffEdit/staff-edit.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent } from './components/studentEdit/student-edit.component';
import { ClientStatusComponent } from './components/clientStatus/client-status.component';
import { SuitabilityFormComponent } from './components/suitabilityForm/suitabilityForm.component';

//Import services
import { AuthGuard } from './guards/auth.guard';
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
    SuitabilityFormComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    StudentService,
    StaffService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
