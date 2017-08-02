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
        router.post("/clientForms/:_id/learningStyle", controller.learningStyleForm);
        router.get("/clientForms/:_id", controller.getAllFormsByID);
        return router;
    }


}

Object.seal(ClientFormsRoutes);
export = ClientFormsRoutes;
