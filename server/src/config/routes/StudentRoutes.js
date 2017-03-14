"use strict";
var express = require("express");
var StudentController = require("./../../controllers/StudentController");
var router = express.Router();
var StudentRoutes = (function () {
    function StudentRoutes() {
        this._studentController = new StudentController();
    }
    Object.defineProperty(StudentRoutes.prototype, "routes", {
        get: function () {
            var controller = this._studentController;
            router.get("/students", controller.retrieve);
            router.post("/students", controller.create);
            router.put("/students/:_id", controller.update);
            router.get("/students/:_id", controller.findById);
            router.delete("/students/:_id", controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return StudentRoutes;
}());
Object.seal(StudentRoutes);
module.exports = StudentRoutes;
