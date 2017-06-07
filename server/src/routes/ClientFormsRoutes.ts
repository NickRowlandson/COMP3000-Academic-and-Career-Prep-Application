import express = require("express");
import ClientFormsController = require("../controllers/ClientFormsController");

var router = express.Router();
class ClientFormsRoutes {
    private _clientFormsController: ClientFormsController;

    constructor () {
        this._clientFormsController = new ClientFormsController();
    }
    get routes () {
        var controller = this._clientFormsController;

        router.post("/clientForms/:_id/consent", controller.consentForm);
        return router;
    }


}

Object.seal(ClientFormsRoutes);
export = ClientFormsRoutes;
