System.register(["./../repository/StudentRepository"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StudentRepository, StudentBusiness;
    return {
        setters: [
            function (StudentRepository_1) {
                StudentRepository = StudentRepository_1;
            }
        ],
        execute: function () {
            StudentBusiness = (function () {
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
            exports_1("default", StudentBusiness);
        }
    };
});
//# sourceMappingURL=StudentBusiness.js.map