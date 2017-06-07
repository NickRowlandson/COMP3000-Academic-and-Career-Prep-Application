import express = require("express");
import CourseController = require("../controllers/CourseController");

var router = express.Router();
class CourseRoutes {
    private _CourseController: CourseController;

    constructor() {
        this._CourseController = new CourseController();
    }
    get routes() {
        var controller = this._CourseController;

        router.get("/course", controller.retrieve);
        //router.post("/Courses", controller.create);
        //router.put("/Courses/:_id", controller.update);
        //router.get("/Courses/:_id", controller.findById);
        //router.delete("/Courses/:_id", controller.delete);

        return router;
    }


}

Object.seal(CourseRoutes);
export = CourseRoutes;
