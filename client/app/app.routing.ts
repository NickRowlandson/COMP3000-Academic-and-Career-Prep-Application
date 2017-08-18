import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';
import { StudentGuard } from './guards/student.guard';
import { ClientGuard } from './guards/client.guard';
import { InstructorGuard } from './guards/instructor.guard';
import { SharedGuard } from './guards/shared.guard';

import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StaffManageComponent } from './components/staff-manage/staff-manage.component';
import { StaffEditComponent }  from './components/staff-edit/staff-edit.component';
import { StudentManageComponent } from './components/student-manage/student-manage.component';
import { StudentEditComponent }  from './components/student-edit/student-edit.component';
import { ClientStatusComponent }  from './components/client-status/client-status.component';
import { SuitabilityFormComponent } from './components/suitability-form/suitability-form.component';
import { ConsentFormComponent } from './components/consent-form/consent-form.component';
import { CaseNotesComponent } from './components/case-notes/case-notes.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { PrfFormComponent } from './components/prf-form/prf-form.component';
import { LearningStyleComponent } from './components/learning-style-form/learning-style-form.component';
import { StudentEnrollmentComponent } from './components/student-enrollment/student-enrollment.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'student-edit/:id',
        component: StudentEditComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'students',
        component: StudentManageComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'clients',
        component: ClientStatusComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'staff',
        component: StaffManageComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'staff-edit/:id',
        component: StaffEditComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'suitability',
        component: SuitabilityFormComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'consent',
        component: ConsentFormComponent,
        canActivate: [AuthGuard, ClientGuard]
    },
    {
        path: 'case-notes',
        component: CaseNotesComponent,
        canActivate: [AuthGuard, SharedGuard]
    },
    {
        path: 'courses',
        component: CourseManageComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'course-edit/:id',
        component: CourseEditComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'prf',
        component: PrfFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'learning-style',
        component: LearningStyleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'timetable',
        component: TimetableComponent,
        canActivate: [AuthGuard, StudentGuard]
    },
    {
        path: 'student-enrollment/:courseID/:instructorID/:courseName',
        component: StudentEnrollmentComponent,
        canActivate: [AuthGuard, StaffGuard]
    },
    {
        path: 'attendance-list',
        component: AttendanceListComponent,
        canActivate: [AuthGuard, InstructorGuard]
    },
    {
        path: 'attendance-report',
        component: AttendanceReportComponent,
        canActivate: [AuthGuard, SharedGuard]
    }

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
