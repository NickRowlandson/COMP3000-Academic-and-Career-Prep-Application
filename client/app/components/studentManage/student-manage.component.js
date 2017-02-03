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
var student_service_1 = require("../../services/student.service");
var router_1 = require("@angular/router");
var StudentManageComponent = (function () {
    function StudentManageComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
    }
    StudentManageComponent.prototype.getStudents = function () {
        var _this = this;
        this.studentService.getStudents().then(function (students) { return _this.students = students; });
    };
    StudentManageComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    StudentManageComponent.prototype.gotoEdit = function (student, event) {
        this.router.navigate(['/edit', student._id]);
    };
    StudentManageComponent.prototype.addStudent = function () {
        this.router.navigate(['/edit', 'new']);
    };
    StudentManageComponent.prototype.deleteStudent = function (student, event) {
        var _this = this;
        event.stopPropagation();
        this.studentService
            .delete(student)
            .then(function (res) {
            _this.students = _this.students.filter(function (h) { return h !== student; });
        })
            .catch(function (error) { return _this.error = error; });
    };
    StudentManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    return StudentManageComponent;
}());
StudentManageComponent = __decorate([
    core_1.Component({
        selector: 'student-manage',
        templateUrl: './app/components/studentManage/student-manage.component.html',
        styleUrls: ['./app/components/studentManage/student-manage.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, student_service_1.StudentService])
], StudentManageComponent);
exports.StudentManageComponent = StudentManageComponent;
//# sourceMappingURL=student-manage.component.js.map