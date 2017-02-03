import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StudentManageComponent }      from './components/studentManage/student-manage.component';
import { StudentDetailComponent }  from './components/studentDetail/student-detail.component';
import { StudentListComponent }  from './components/studentList/student-list.component';
import { StudentViewComponent }  from './components/studentView/student-view.component';

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
    path: 'detail/:id',
    component: StudentDetailComponent
  },
  {
    path: 'student',
    component: StudentManageComponent
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  {
    path: 'view/:id',
    component: StudentViewComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
