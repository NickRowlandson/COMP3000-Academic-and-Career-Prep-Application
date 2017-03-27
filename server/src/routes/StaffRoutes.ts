import express = require("express");
import StaffController = require("../controllers/StaffController");

var router = express.Router();
class StaffRoutes {
    private _staffController: StaffController;

    constructor () {
        this._staffController = new StaffController();
    }
    get routes () {
        var controller = this._staffController;

        router.get("/staff", controller.retrieve);
        router.post("/staff", controller.create);
        router.put("/staff/:_id", controller.update);
        router.get("/staff/:_id", controller.findById);
        router.delete("/staff/:_id", controller.delete);

        return router;
    }


}

Object.seal(StaffRoutes);
export = StaffRoutes;
