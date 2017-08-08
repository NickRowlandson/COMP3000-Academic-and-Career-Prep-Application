import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
import ClientController = require("../controllers/ClientController");
const MailService = require("../services/MailService");
const PRFService = require("../services/PRFService");
var sql = require('mssql');
var auth = ["Admin", "Staff", "Client"];

const config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

class ClientFormsController {
    consentForm(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var consentForm = req.body.consentForm;
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            var consentQuery = "'" + _id + "', '" +
                                consentForm.date + "', '" +
                                consentForm.allowDetailedMessage + "', '" +
                                consentForm.ontarioWorks + "', '" +
                                consentForm.ontarioDisabilityProgram + "', '" +
                                consentForm.employmentInsurance + "', '" +
                                consentForm.employmentServices + "', '" +
                                consentForm.other + "', '" +
                                consentForm.contactName + "', '" +
                                consentForm.contactNum + "', '" +
                                consentForm.literacyAgencies + "', '" +
                                consentForm.literacyWitness + "'";
                            new sql.Request(connection)
                                .query("INSERT INTO Consent VALUES (" + consentQuery + ")")
                                .then(function() {
                                    new sql.Request(connection)
                                        .query("UPDATE Clients SET consent= 'false' WHERE userID = '" + _id + "'")
                                        .then(function() {
                                            res.send({ "success": "success" });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("Update client " + err);
                                        });
                                }).catch(function(err) {
                                    console.log("Save consent form " + err);
                                    res.send({ "error": "error" });
                                });
                        });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    learningStyleForm(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var learningStyleForm = req.body.learningStyleForm;
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            var learningStyleQuery = "'" + _id + "', '" +
                                learningStyleForm.seeing + "', '" +
                                learningStyleForm.hearing + "', '" +
                                learningStyleForm.doing + "'";
                            new sql.Request(connection)
                                .query("INSERT INTO LearningStyle VALUES (" + learningStyleQuery + ")")
                                .then(function() {
                                    new sql.Request()
                                        .query("UPDATE Clients SET learningStyle= 'false' WHERE userID = '" + _id + "'")
                                        .then(function() {
                                            res.send({ "success": "success" });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("Update client " + err);
                                        });
                                }).catch(function(err) {
                                    console.log("Save learning style form " + err);
                                    res.send({ "error": "error" });
                                });
                        });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    getAllFormsByID(req: express.Request, res: express.Response) {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query('SELECT * FROM SuitabilityForm WHERE userID = ' + _id + '')
                                .then(function(suitabilityForm) {
                                    new sql.Request(connection)
                                        .query('SELECT * FROM Consent WHERE userID = ' + _id + '')
                                        .then(function(consentForm) {
                                            new sql.Request(connection)
                                                .query('SELECT * FROM LearningStyle WHERE userID = ' + _id + '')
                                                .then(function(learningStyleForm) {
                                                    res.send({
                                                        suitabilityForm: suitabilityForm,
                                                        consentForm: consentForm,
                                                        learningStyleForm: learningStyleForm
                                                    });
                                                }).catch(function(err) {
                                                    res.send({ "error": "error" }); console.log("Get learningStyleForms " + err);
                                                });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("Get consentForms " + err);
                                        });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Get suitabilityForms " + err);
                                });
                        });
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

}
export = ClientFormsController;
