"use strict";
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var students_component_1 = require("./components/students/students.component");
var student_detail_component_1 = require("./components/studentDetail/student-detail.component");
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
        path: 'students',
        component: students_component_1.StudentsComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map