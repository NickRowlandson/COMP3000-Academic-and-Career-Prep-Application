"use strict";
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var user_manage_component_1 = require("./components/userManage/user-manage.component");
var user_edit_component_1 = require("./components/userEdit/user-edit.component");
var student_manage_component_1 = require("./components/studentManage/student-manage.component");
var student_edit_component_1 = require("./components/studentEdit/student-edit.component");
var student_list_component_1 = require("./components/studentList/student-list.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'studentEdit/:id',
        component: student_edit_component_1.StudentEditComponent
    },
    {
        path: 'student',
        component: student_manage_component_1.StudentManageComponent
    },
    {
        path: 'list',
        component: student_list_component_1.StudentListComponent
    },
    {
        path: 'user',
        component: user_manage_component_1.UserManageComponent
    },
    {
        path: 'userEdit/:id',
        component: user_edit_component_1.UserEditComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
