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
var Student_1 = require("../../models/Student");
var router_1 = require("@angular/router");
var student_service_1 = require("../../services/student.service");
var StudentEditComponent = (function () {
    function StudentEditComponent(studentService, route) {
        this.studentService = studentService;
        this.route = route;
        this.newStudent = false;
        this.navigated = false; // true if navigated here
    }
    StudentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newStudent = true;
                _this.student = new Student_1.Student();
            }
            else {
                _this.newStudent = false;
                _this.studentService.getStudent(id)
                    .then(function (student) { return _this.student = student; });
            }
        });
    };
    StudentEditComponent.prototype.save = function () {
        var _this = this;
        this.studentService
            .save(this.student)
            .then(function (student) {
            _this.student = student; // saved student, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    StudentEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    return StudentEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Student_1.Student)
], StudentEditComponent.prototype, "student", void 0);
StudentEditComponent = __decorate([
    core_1.Component({
        selector: 'student-edit',
        templateUrl: './app/components/studentEdit/student-edit.component.html',
        styleUrls: ['./app/components/studentEdit/student-edit.component.css']
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService, router_1.ActivatedRoute])
], StudentEditComponent);
exports.StudentEditComponent = StudentEditComponent;
//# sourceMappingURL=student-edit.component.js.map