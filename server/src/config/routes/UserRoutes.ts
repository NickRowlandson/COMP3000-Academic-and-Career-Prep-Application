import express = require("express");
import UserController = require("./../../controllers/UserController");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        var controller = this._userController;

        router.get("/users", controller.retrieve);
        router.post("/users", controller.create);
        router.put("/users/:_id", controller.update);
        router.get("/users/:_id", controller.findById);
        router.delete("/users/:_id", controller.delete);
        router.post("/auth/", controller.auth);

        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;
