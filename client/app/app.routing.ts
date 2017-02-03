import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StudentManageComponent } from './components/studentManage/student-manage.component';
import { StudentEditComponent }  from './components/studentEdit/student-edit.component';
import { StudentListComponent }  from './components/studentList/student-list.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'edit/:id',
        component: StudentEditComponent
    },
    {
        path: 'student',
        component: StudentManageComponent
    },
    {
        path: 'list',
        component: StudentListComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
