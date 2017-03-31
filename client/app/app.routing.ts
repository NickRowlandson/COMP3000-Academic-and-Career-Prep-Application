import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StaffManageComponent } from './components/staffManage/staff-manage.component';
import { StaffEditComponent }  from './components/staffEdit/staff-edit.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent }  from './components/studentEdit/student-edit.component';
import { ClientStatusComponent }  from './components/clientStatus/client-status.component';
import { SuitabilityFormComponent } from './components/suitabilityForm/suitabilityForm.component';

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
        canActivate: [AuthGuard]
    },
    {
        path: 'students',
        component: StudentManageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'clients',
        component: ClientStatusComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'staff',
        component: StaffManageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'staffEdit/:id',
        component: StaffEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'suitability',
        component: SuitabilityFormComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
