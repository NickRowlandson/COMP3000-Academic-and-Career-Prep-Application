"use strict";
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var student_manage_component_1 = require("./components/studentManage/student-manage.component");
var student_detail_component_1 = require("./components/studentDetail/student-detail.component");
var student_list_component_1 = require("./components/studentList/student-list.component");
var student_view_component_1 = require("./components/studentView/student-view.component");
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
        path: 'detail/:id',
        component: student_detail_component_1.StudentDetailComponent
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
        path: 'view/:id',
        component: student_view_component_1.StudentViewComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map