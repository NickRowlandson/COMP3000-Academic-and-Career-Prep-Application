import express = require("express");
import UserController = require("../controllers/UserController");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        var controller = this._userController;

        router.get("/users", controller.retrieve);
        router.get("/users/:_id", controller.findById);

        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;
