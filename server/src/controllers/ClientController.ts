import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
const MailService = require("../services/MailService");
const PRFService = require("../services/PRFService");
var sql = require('mssql');
var auth = ["Admin", "Staff"];

const config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

class ClientController {

    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var salt = bcrypt.genSaltSync(10);
                    var password = req.body.client.password;
                    // Hash the password with the salt
                    password = bcrypt.hashSync(password, salt);
                    req.body.client.password = password;
                    var client = req.body.client;
                    var suitabilityForm = req.body.suitabilityForm;

                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("INSERT INTO Users VALUES ('" + client.username + "','" + client.password + "','Client')")
                                .then(function() {
                                    new sql.Request(connection)
                                        .query("SELECT userID FROM Users WHERE username = '" + client.username + "' AND password = '" + client.password + "'")
                                        .then(function(id) {
                                            var clientQuery = "'" + id[0].userID + "', '" +
                                                client.firstName + "', '" +
                                                client.lastName + "', '" +
                                                client.email + "', '" +
                                                client.inquiryDate + "', '" +
                                                client.birthday + "', '" +
                                                client.phone + "', '" +
                                                true + "', '" +
                                                true + "', '" +
                                                true + "'";

                                            new MailService().welcomeMessage(client);

                                            new sql.Request().query("INSERT INTO Clients VALUES (" + clientQuery + ")").then(function() {
                                                if (Object.keys(suitabilityForm).length != 0) {
                                                    var suitabilityFormQuery = "'" + id[0].userID
                                                        + "', '" + suitabilityForm.transcript
                                                        + "', '" + suitabilityForm.courses
                                                        + "', '" + suitabilityForm.goal
                                                        + "', '" + suitabilityForm.transitionDate
                                                        + "', '" + suitabilityForm.governmentID
                                                        + "', '" + suitabilityForm.appropriateGoal
                                                        + "', '" + suitabilityForm.isValidAge
                                                        + "', '" + suitabilityForm.schoolRegistration
                                                        + "', '" + suitabilityForm.availableDuringClass
                                                        + "', '" + suitabilityForm.lastGrade
                                                        + "', '" + suitabilityForm.level
                                                        + "', '" + suitabilityForm.offerStartDate
                                                        + "', '" + suitabilityForm.meetsGoal
                                                        + "', '" + suitabilityForm.timeOutOfSchool
                                                        + "', '" + suitabilityForm.inProgramBefore
                                                        + "', '" + suitabilityForm.employment
                                                        + "', '" + suitabilityForm.incomeSource
                                                        + "', '" + suitabilityForm.ageRange
                                                        + "', '" + suitabilityForm.hoursPerWeek
                                                        + "', '" + suitabilityForm.workHistory
                                                        + "', '" + suitabilityForm.factorHealth
                                                        + "', '" + suitabilityForm.factorInstructions
                                                        + "', '" + suitabilityForm.factorCommunication
                                                        + "', '" + suitabilityForm.factorLanguage
                                                        + "', '" + suitabilityForm.factorComputer
                                                        + "', '" + suitabilityForm.factorHousing
                                                        + "', '" + suitabilityForm.factorTransportation
                                                        + "', '" + suitabilityForm.factorDaycare
                                                        + "', '" + suitabilityForm.factorInternet
                                                        + "', '" + suitabilityForm.factorPersonal
                                                        + "', '" + suitabilityForm.factorOther
                                                        + "', '" + suitabilityForm.summaryTransportation
                                                        + "', '" + suitabilityForm.summaryHousing
                                                        + "', '" + suitabilityForm.summaryChildcare
                                                        + "', '" + suitabilityForm.summaryHealth
                                                        + "', '" + suitabilityForm.summaryOther
                                                        + "', '" + suitabilityForm.dbTotalPoints + "'";
                                                    new sql.Request(connection)
                                                        .query("INSERT INTO SuitabilityForm VALUES (" + suitabilityFormQuery + ")")
                                                        .then(function() {
                                                            new sql.Request(connection)
                                                                .query("UPDATE Clients SET suitability= 'false' WHERE userID = '" + id[0].userID + "'")
                                                                .then(function() {
                                                                    res.send({ "success": "success" });
                                                                }).catch(function(err) {
                                                                    res.send({ "error": "error" }); console.log("Update client " + err);
                                                                });
                                                        }).catch(function(err) {
                                                            res.send({ "error": "error" }); console.log("insert suitabilityForm " + err);
                                                        });
                                                } else {
                                                    res.send({ "success": "success" });
                                                }
                                            }).catch(function(err) {
                                                res.send({ "error": "error" }); console.log("insert client " + err);
                                                new sql.Request(connection)
                                                    .query("DELETE FROM Users WHERE userID = '" + id[0] + "'")
                                                    .then(function() {
                                                        res.send({ "success": "success" });
                                                    }).catch(function(err) {
                                                        res.send({ "error": "error" }); console.log("Delete user with id " + id[0] + ". " + err);
                                                    });
                                            });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("get user " + err);
                                        });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("insert user " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var client = req.body;
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("UPDATE Clients SET firstName='" + client.firstName + "', lastName='" + client.lastName + "', birthdate='" + client.birthday + "', email='" + client.email + "', phone='" + client.phone + "' WHERE studentID = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Update client " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("DELETE FROM Clients WHERE userID = '" + _id + "'")
                                .then(function() {
                                    new sql.Request(connection)
                                        .query("DELETE FROM Users WHERE userID = '" + _id + "'")
                                        .then(function() {
                                            res.send({ "success": "success" });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("Delete user with id " + _id + ". " + err);
                                        });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Delete client with id " + _id + ". " + err);
                                });

                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    removeFromTable(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("DELETE FROM Clients WHERE userID = '" + _id + "'")
                                .then(function() {
                                    new sql.Request(connection)
                                        .query("UPDATE Users SET userType= 'Student' WHERE userID = '" + _id + "'")
                                        .then(function() {
                                            res.send({ "success": "success" });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" }); console.log("Update user userType " + err);
                                        });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Delete form client table with id " + _id + ". " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query('SELECT * FROM Clients')
                                .then(function(clients) {
                                    new sql.Request(connection)
                                        .query('SELECT * FROM SuitabilityForm')
                                        .then(function(suitabilityForms) {
                                            new sql.Request(connection)
                                                .query('SELECT * FROM Consent')
                                                .then(function(consentForms) {
                                                    new sql.Request(connection)
                                                        .query('SELECT * FROM LearningStyle')
                                                        .then(function(learningStyleForms) {
                                                            res.send({
                                                                clients: clients,
                                                                suitabilityForms: suitabilityForms,
                                                                consentForms: consentForms,
                                                                learningStyleForms: learningStyleForms
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
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Get clients " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Client"], done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT * FROM Clients WHERE userID = '" + _id + "'")
                                .then(function(client) {
                                    res.send({ client: client });
                                }).catch(function(err) {
                                    console.log("Get client by id " + err);
                                    res.send({ "error": "error" });
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    populatePRF(req: express.Request, res: express.Response): void {
        console.log("Populating PRF...");
        new AuthController().authUser(req, res, {
            requiredAuth: auth, done: function() {
                var _id: string = req.params._id;
                sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Clients C INNER JOIN SuitabilityForm S ON C.userID = S.userID WHERE C.userID = '" + _id + "' AND S.userID = '" + _id + "'")
                            .then(function(recordset) {
                                new PRFService().populatePRF(recordset[0]);
                                res.send({ "success": "success" });
                            }).catch(function(err) {
                                console.log("Get client by id for prf " + err);
                                res.send({ "error": "error" });
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
            }
        });
    }
}
export = ClientController;
