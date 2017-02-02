System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StudentController;
    return {
        setters: [],
        execute: function () {
            StudentController = (function () {
                function StudentController() {
                }
                StudentController.prototype.create = function (req, res) {
                    try {
                        var hero = req.body;
                        var StudentBusiness = new StudentBusiness();
                        StudentBusiness.create(hero, function (error, result) {
                            if (error)
                                res.send({ "error": "error" });
                            else
                                res.send({ "success": "success" });
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ "error": "error in your request" });
                    }
                };
                StudentController.prototype.update = function (req, res) {
                    try {
                        var student = req.body;
                        var _id = req.params._id;
                        var StudentBusiness = new StudentBusiness();
                        StudentBusiness.update(_id, student, function (error, result) {
                            if (error)
                                res.send({ "error": "error" });
                            else
                                res.send({ "success": "success" });
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ "error": "error in your request" });
                    }
                };
                StudentController.prototype.delete = function (req, res) {
                    try {
                        var _id = req.params._id;
                        var StudentBusiness = new StudentBusiness();
                        StudentBusiness.delete(_id, function (error, result) {
                            if (error)
                                res.send({ "error": "error" });
                            else
                                res.send({ "success": "success" });
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ "error": "error in your request" });
                    }
                };
                StudentController.prototype.retrieve = function (req, res) {
                    try {
                        var StudentBusiness = new StudentBusiness();
                        StudentBusiness.retrieve(function (error, result) {
                            if (error)
                                res.send({ "error": "error" });
                            else
                                res.send(result);
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ "error": "error in your request" });
                    }
                };
                StudentController.prototype.findById = function (req, res) {
                    try {
                        var _id = req.params._id;
                        var StudentBusiness = new StudentBusiness();
                        StudentBusiness.findById(_id, function (error, result) {
                            if (error)
                                res.send({ "error": "error" });
                            else
                                res.send(result);
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ "error": "error in your request" });
                    }
                };
                return StudentController;
            }());
            exports_1("default", StudentController);
        }
    };
});
//# sourceMappingURL=StudentController.js.map