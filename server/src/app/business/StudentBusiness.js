"use strict";
var StudentRepository = require("./../repository/StudentRepository");
var StudentBusiness = (function () {
    function StudentBusiness() {
        this._studentRepository = new StudentRepository();
    }
    StudentBusiness.prototype.create = function (item, callback) {
        this._studentRepository.create(item, callback);
    };
    StudentBusiness.prototype.retrieve = function (callback) {
        this._studentRepository.retrieve(callback);
    };
    StudentBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._studentRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._studentRepository.update(res._id, item, callback);
        });
    };
    StudentBusiness.prototype.delete = function (_id, callback) {
        this._studentRepository.delete(_id, callback);
    };
    StudentBusiness.prototype.findById = function (_id, callback) {
        this._studentRepository.findById(_id, callback);
    };
    return StudentBusiness;
}());
Object.seal(StudentBusiness);
module.exports = StudentBusiness;
//# sourceMappingURL=StudentBusiness.js.map