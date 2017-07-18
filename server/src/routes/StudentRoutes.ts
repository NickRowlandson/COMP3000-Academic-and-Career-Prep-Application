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
        router.post("/enroll/:_studentID/:_courseID", controller.addToTimetable);
        router.delete("/drop/:_studentID/:_courseID", controller.removeFromTimetable);
        // router.get("/timetable", controller.getTimetables);
        router.get("/timetable/:_studentID", controller.getTimetablesById);
        router.post("/caseNotes/:_studentID", controller.createNote);
        return router;
    }


}

Object.seal(StudentRoutes);
export = StudentRoutes;
