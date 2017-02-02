"use strict";
var StudentModel = (function () {
    function StudentModel(studentModel) {
        this._studentModel = studentModel;
    }
    Object.defineProperty(StudentModel.prototype, "name", {
        get: function () {
            return this._studentModel.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentModel.prototype, "power", {
        get: function () {
            return this._studentModel.power;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StudentModel.prototype, "amountPeopleSaved", {
        get: function () {
            return this._studentModel.amountPeopleSaved;
        },
        enumerable: true,
        configurable: true
    });
    return StudentModel;
}());
Object.seal(StudentModel);
module.exports = StudentModel;
//# sourceMappingURL=StudentModel.js.map