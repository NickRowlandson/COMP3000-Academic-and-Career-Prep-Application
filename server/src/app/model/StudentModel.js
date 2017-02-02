"use strict";
var StudentModel = (function () {
    function StudentModel(studentModel) {
        this._studentModel = studentModel;
    }
    Object.defineProperty(StudentModel.prototype, "firstName", {
        get: function () {
            return this._studentModel.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentModel.prototype, "lastName", {
        get: function () {
            return this._studentModel.lastName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentModel.prototype, "studentNumber", {
        get: function () {
            return this._studentModel.studentNumber;
        },
        enumerable: true,
        configurable: true
    });
    return StudentModel;
}());
Object.seal(StudentModel);
module.exports = StudentModel;
//# sourceMappingURL=StudentModel.js.map