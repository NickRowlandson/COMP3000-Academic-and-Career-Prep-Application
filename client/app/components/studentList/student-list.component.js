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
var student_service_1 = require("../../services/student.service");
var StudentListComponent = (function () {
    function StudentListComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
        this.students = [];
    }
    StudentListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.studentService.getStudents()
            .then(function (students) { return _this.students = students; });
    };
    StudentListComponent.prototype.gotoView = function (student) {
        var link = ['/view', student._id];
        this.router.navigate(link);
    };
    return StudentListComponent;
}());
StudentListComponent = __decorate([
    core_1.Component({
        selector: 'student-list',
        templateUrl: './app/components/studentList/student-list.component.html',
        styleUrls: ['./app/components/studentList/student-list.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        student_service_1.StudentService])
], StudentListComponent);
exports.StudentListComponent = StudentListComponent;
//# sourceMappingURL=student-list.component.js.map