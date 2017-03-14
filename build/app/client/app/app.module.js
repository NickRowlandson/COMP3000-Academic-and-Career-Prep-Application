System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "@angular/http", "./app.component", "./app.routing", "./components/login/login.component", "./components/dashboard/dashboard.component", "./components/userManage/user-manage.component", "./components/userEdit/user-edit.component", "./components/studentManage/student-manage.component", "./components/studentEdit/student-edit.component", "./components/studentList/student-list.component", "./components/suitabilityForm/suitabilityForm.component", "./guards/auth.guard", "./services/authentication.service", "./services/student.service", "./services/user.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, forms_1, http_1, app_component_1, app_routing_1, login_component_1, dashboard_component_1, user_manage_component_1, user_edit_component_1, student_manage_component_1, student_edit_component_1, student_list_component_1, suitabilityForm_component_1, auth_guard_1, authentication_service_1, student_service_1, user_service_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (user_manage_component_1_1) {
                user_manage_component_1 = user_manage_component_1_1;
            },
            function (user_edit_component_1_1) {
                user_edit_component_1 = user_edit_component_1_1;
            },
            function (student_manage_component_1_1) {
                student_manage_component_1 = student_manage_component_1_1;
            },
            function (student_edit_component_1_1) {
                student_edit_component_1 = student_edit_component_1_1;
            },
            function (student_list_component_1_1) {
                student_list_component_1 = student_list_component_1_1;
            },
            function (suitabilityForm_component_1_1) {
                suitabilityForm_component_1 = suitabilityForm_component_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
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
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map