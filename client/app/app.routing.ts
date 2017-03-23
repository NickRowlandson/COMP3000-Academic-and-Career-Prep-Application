import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent }   from './components/login/login.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { UserManageComponent } from './components/userManage/user-manage.component';
import { UserEditComponent }  from './components/userEdit/user-edit.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent }  from './components/studentEdit/student-edit.component';
import { StudentListComponent }  from './components/studentList/student-list.component';
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
        component: StudentEditComponent
    },
    {
        path: 'student',
        component: StudentManageComponent
    },
    {
        path: 'list',
        component: StudentListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        component: UserManageComponent
    },
    {
        path: 'userEdit/:id',
        component: UserEditComponent

    },
    {
        path: 'suitability',
        component: SuitabilityFormComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
