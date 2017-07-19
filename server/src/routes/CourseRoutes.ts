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
        router.get("/instructor-courses/:_id", controller.getInstructorCourses);
        router.post("/course", controller.create);
        router.put("/course/:_id", controller.update);
        router.get("/course/:_id", controller.findById);
        router.delete("/course/:_id", controller.delete);
        router.get("/getProfessors", controller.getProfessor);
        router.get("/getCampuses", controller.getCampuses);
        return router;
    }
}

Object.seal(CourseRoutes);
export = CourseRoutes;
