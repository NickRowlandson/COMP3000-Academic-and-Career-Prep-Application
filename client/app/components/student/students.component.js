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
var StudentsComponent = (function () {
    function StudentsComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
    }
    StudentsComponent.prototype.getHeroes = function () {
        var _this = this;
        this.studentService.getStudents().then(function (students) { return _this.students = students; });
    };
    StudentsComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    StudentsComponent.prototype.onSelect = function (student) { this.selectedStudent = student; };
    StudentsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedStudent._id]);
    };
    StudentsComponent.prototype.addStudent = function () {
        this.selectedStudent = null;
        this.router.navigate(['/detail', 'new']);
    };
    StudentsComponent.prototype.deleteStudent = function (student, event) {
        var _this = this;
        event.stopPropagation();
        this.studentService
            .delete(student)
            .then(function (res) {
            _this.students = _this.students.filter(function (h) { return h !== student; });
            if (_this.selectedStudent === student) {
                _this.selectedStudent = null;
            }
        })
            .catch(function (error) { return _this.error = error; });
    };
    return StudentsComponent;
}());
StudentsComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        templateUrl: './app/components/heroes/students.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        student_service_1.StudentService])
], StudentsComponent);
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.component.js.map