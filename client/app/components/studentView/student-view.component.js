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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var student_1 = require("../../models/student");
var student_service_1 = require("../../services/student.service");
var StudentViewComponent = (function () {
    function StudentViewComponent(route, studentService) {
        this.route = route;
        this.studentService = studentService;
    }
    StudentViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.studentService.getStudent(id)
                .then(function (student) { return _this.student = student; });
        });
    };
    StudentViewComponent.prototype.goBack = function () {
        window.history.back();
    };
    return StudentViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", student_1.Student)
], StudentViewComponent.prototype, "student", void 0);
StudentViewComponent = __decorate([
    core_1.Component({
        selector: 'student-view',
        templateUrl: './app/components/studentView/student-view.component.html',
        styleUrls: ['./app/components/studentView/student-view.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, student_service_1.StudentService])
], StudentViewComponent);
exports.StudentViewComponent = StudentViewComponent;
//# sourceMappingURL=student-view.component.js.map