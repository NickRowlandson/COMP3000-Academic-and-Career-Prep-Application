System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StudentModel;
    return {
        setters: [],
        execute: function () {
            StudentModel = (function () {
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
            exports_1("default", StudentModel);
        }
    };
});
//# sourceMappingURL=StudentModel.js.map