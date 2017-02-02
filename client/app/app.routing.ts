import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { StudentsComponent }      from './components/students/students.component';
import { StudentDetailComponent }  from './components/studentDetail/student-detail.component';

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
    path: 'students',
    component: StudentsComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
