System.register(["@angular/core", "@angular/router", "../../services/student.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, student_service_1, DashboardComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (student_service_1_1) {
                student_service_1 = student_service_1_1;
            }
        ],
        execute: function () {
            DashboardComponent = (function () {
                function DashboardComponent(router, studentService) {
                    this.router = router;
                    this.studentService = studentService;
                    this.students = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.studentService.getStudents()
                        .then(function (students) { return _this.students = students; });
                };
                DashboardComponent.prototype.gotoDetail = function (student) {
                    var link = ['/detail', student._id];
                    this.router.navigate(link);
                };
                return DashboardComponent;
            }());
            DashboardComponent = __decorate([
                core_1.Component({
                    selector: 'my-dashboard',
                    templateUrl: './app/components/dashboard/dashboard.component.html',
                    styleUrls: ['./app/components/dashboard/dashboard.component.css']
                }),
                __metadata("design:paramtypes", [router_1.Router,
                    student_service_1.StudentService])
            ], DashboardComponent);
            exports_1("DashboardComponent", DashboardComponent);
        }
    };
});
//# sourceMappingURL=dashboard.component.js.map