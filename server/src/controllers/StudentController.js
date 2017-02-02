"use strict";
var StudentBusiness = require("./../app/business/StudentBusiness");
var StudentController = (function () {
    function StudentController() {
    }
    StudentController.prototype.create = function (req, res) {
        try {
            var student = req.body;
            var studentBusiness = new StudentBusiness();
            studentBusiness.create(student, function (error, result) {
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
            var studentBusiness = new StudentBusiness();
            studentBusiness.update(_id, student, function (error, result) {
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
            var studentBusiness = new StudentBusiness();
            studentBusiness.delete(_id, function (error, result) {
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
            var studentBusiness = new StudentBusiness();
            studentBusiness.retrieve(function (error, result) {
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
            var studentBusiness = new StudentBusiness();
            studentBusiness.findById(_id, function (error, result) {
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
module.exports = StudentController;
//# sourceMappingURL=StudentController.js.map