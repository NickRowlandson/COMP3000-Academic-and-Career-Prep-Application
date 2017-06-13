import express = require("express");
import ClientController = require("../controllers/ClientController");

var router = express.Router();
class ClientRoutes {
    private _clientController: ClientController;

    constructor () {
        this._clientController = new ClientController();
    }
    get routes () {
        var controller = this._clientController;

        router.get("/clients", controller.retrieve);
        router.post("/clients", controller.create);
        router.put("/clients/:_id", controller.update);
        router.get("/clients/:_id", controller.findById);
        router.delete("/clients/:_id", controller.delete);
        router.delete("/clients/:_id/remove", controller.removeFromTable);
        router.get("/clients/:_id/prf", controller.populatePRF);
        return router;
    }


}

Object.seal(ClientRoutes);
export = ClientRoutes;
