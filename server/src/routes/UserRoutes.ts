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

        router.get("/users/:token", controller.findCurrentUserId);

        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;
