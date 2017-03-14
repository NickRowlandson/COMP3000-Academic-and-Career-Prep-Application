"use strict";
var router_1 = require("@angular/router");
var auth_guard_1 = require("./guards/auth.guard");
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var user_manage_component_1 = require("./components/userManage/user-manage.component");
var user_edit_component_1 = require("./components/userEdit/user-edit.component");
var student_manage_component_1 = require("./components/studentManage/student-manage.component");
var student_edit_component_1 = require("./components/studentEdit/student-edit.component");
var student_list_component_1 = require("./components/studentList/student-list.component");
var suitabilityForm_component_1 = require("./components/suitabilityForm/suitabilityForm.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'studentEdit/:id',
        component: student_edit_component_1.StudentEditComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'student',
        component: student_manage_component_1.StudentManageComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'list',
        component: student_list_component_1.StudentListComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'user',
        component: user_manage_component_1.UserManageComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'userEdit/:id',
        component: user_edit_component_1.UserEditComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'suitability',
        component: suitabilityForm_component_1.SuitabilityFormComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
