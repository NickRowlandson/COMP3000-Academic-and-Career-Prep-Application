import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { StaffGuard } from './guards/staff.guard';
import { StudentGuard } from './guards/student.guard';
import { ClientGuard } from './guards/client.guard';

import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StaffManageComponent } from './components/staffManage/staff-manage.component';
import { StaffEditComponent }  from './components/staffEdit/staff-edit.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent }  from './components/studentEdit/student-edit.component';
import { ClientStatusComponent }  from './components/clientStatus/client-status.component';
import { SuitabilityFormComponent } from './components/suitabilityForm/suitabilityForm.component';
import { ConsentFormComponent } from './components/consentForm/consentForm.component';

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
        path: 'studentEdit/:id',
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
        path: 'staffEdit/:id',
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
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
