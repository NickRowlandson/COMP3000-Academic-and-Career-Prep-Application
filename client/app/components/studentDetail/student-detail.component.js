/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */
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
var StudentDetailComponent = (function () {
    function StudentDetailComponent(studentService, route) {
        this.studentService = studentService;
        this.route = route;
        this.newStudent = false;
        this.navigated = false; // true if navigated here
    }
    StudentDetailComponent.prototype.ngOnInit = function () {
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
    StudentDetailComponent.prototype.save = function () {
        var _this = this;
        this.studentService
            .save(this.student)
            .then(function (student) {
            _this.student = student; // saved hero, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    StudentDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    return StudentDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Student_1.Student)
], StudentDetailComponent.prototype, "student", void 0);
StudentDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-student-detail',
        templateUrl: './app/components/studentDetail/student-detail.component.html'
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService,
        router_1.ActivatedRoute])
], StudentDetailComponent);
exports.StudentDetailComponent = StudentDetailComponent;
//# sourceMappingURL=student-detail.component.js.map