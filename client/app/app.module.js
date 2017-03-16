"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
//Import components
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var user_manage_component_1 = require("./components/userManage/user-manage.component");
var user_edit_component_1 = require("./components/userEdit/user-edit.component");
var student_manage_component_1 = require("./components/studentManage/student-manage.component");
var student_edit_component_1 = require("./components/studentEdit/student-edit.component");
var student_list_component_1 = require("./components/studentList/student-list.component");
var suitabilityForm_component_1 = require("./components/suitabilityForm/suitabilityForm.component");
//Import services
var auth_guard_1 = require("./guards/auth.guard");
var authentication_service_1 = require("./services/authentication.service");
var student_service_1 = require("./services/student.service");
var user_service_1 = require("./services/user.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            user_manage_component_1.UserManageComponent,
            user_edit_component_1.UserEditComponent,
            student_manage_component_1.StudentManageComponent,
            student_edit_component_1.StudentEditComponent,
            student_list_component_1.StudentListComponent,
            suitabilityForm_component_1.SuitabilityFormComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            authentication_service_1.AuthService,
            student_service_1.StudentService,
            user_service_1.UserService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
