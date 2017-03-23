import express = require("express");
import StudentController = require("../controllers/StudentController");

var router = express.Router();
class StudentRoutes {
    private _studentController: StudentController;

    constructor () {
        this._studentController = new StudentController();
    }
    get routes () {
        var controller = this._studentController;

        router.get("/students", controller.retrieve);
        router.post("/students", controller.create);
        router.put("/students/:_id", controller.update);
        router.get("/students/:_id", controller.findById);
        router.delete("/students/:_id", controller.delete);

        return router;
    }


}

Object.seal(StudentRoutes);
export = StudentRoutes;
