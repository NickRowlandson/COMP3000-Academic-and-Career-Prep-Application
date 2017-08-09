import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
const MailService = require("../services/MailService");
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
                                .query("SELECT * FROM Users")
                                .then(function(users) {
                                    var validated = true;
                                    var error;
                                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    var emailValidation = re.test(client.email);
                                    for (let user of users) {
                                        if (user.username === client.username) {
                                            validated = false;
                                            error = "username in use";
                                            break;
                                        }
                                    }
                                    if (!emailValidation && validated) {
                                        validated = false;
                                        error = "incorrect email format";
                                    }
                                    if (validated) {
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
                                                        try {
                                                            new MailService().welcomeMessage(client);
                                                        } catch (e) {
                                                            console.log("Invalid email address provided...");
                                                        }
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
                                                                        console.log("Suitability inserted");
                                                                        new sql.Request(connection)
                                                                            .query("UPDATE Clients SET suitability= 'false' WHERE userID = '" + id[0].userID + "'")
                                                                            .then(function() {
                                                                                res.send({ "success": "success" });
                                                                            }).catch(function(err) {
                                                                                res.send({ "error": "error" });
                                                                                console.log("Update client " + err);
                                                                            });
                                                                    }).catch(function(err) {
                                                                        res.send({ "error": "error" });
                                                                        console.log("insert suitabilityForm " + err);
                                                                    });
                                                            } else {
                                                                res.send({ "success": "success" });
                                                                console.log("Suitability not provided.");
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
                                    } else {
                                        res.send({ "error": error })
                                    }
                                }).catch(function(err) {
                                    console.log(err);
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

    addSuitability(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    var suitabilityForm = req.body;

                    sql.connect(config)
                        .then(function(connection) {

                    var suitabilityFormQuery = "'" + _id
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
                              .query("UPDATE Clients SET suitability = 'false' WHERE userID = " + _id + "")
                              .then(function() {
                                res.send({"success": "success"});
                              }).catch();
                        }).catch();
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

    updateSuitability(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var suitability = req.body;
                    sql.connect(config)
                        .then(function(connection) {
                          var query = "UPDATE SuitabilityForm SET transcript='" + suitability.transcript
                          + "', courses='" + suitability.courses
                          + "', goal='" + suitability.goal
                          + "', transitionDate='" + suitability.transitionDate
                          + "', governmentID='" + suitability.governmentID
                          + "', appropriateGoal='" + suitability.appropriateGoal
                          + "', isValidAge='" + suitability.isValidAge
                          + "', schoolRegistration='" + suitability.schoolRegistration
                          + "', availableDuringClass='" + suitability.availableDuringClass
                          + "', lastGrade='" + suitability.lastGrade
                          + "', level='" + suitability.level
                          + "', offerStartDate='" + suitability.offerStartDate
                          + "', meetsGoal='" + suitability.meetsGoal
                          + "', timeOutOfSchool='" + suitability.timeOutOfSchool
                          + "', inProgramBefore='" + suitability.inProgramBefore
                          + "', employment='" + suitability.employment
                          + "', incomeSource='" + suitability.incomeSource
                          + "', ageRange='" + suitability.ageRange
                          + "', hoursPerWeek='" + suitability.hoursPerWeek
                          + "', workHistory='" + suitability.workHistory
                          + "', factorHealth='" + suitability.factorHealth
                          + "', factorInstructions='" + suitability.factorInstructions
                          + "', factorCommunication='" + suitability.factorCommunication
                          + "', factorLanguage='" + suitability.factorLanguage
                          + "', factorComputer='" + suitability.factorComputer
                          + "', factorHousing='" + suitability.factorHousing
                          + "', factorTransportation='" + suitability.factorTransportation
                          + "', factorDaycare='" + suitability.factorDaycare
                          + "', factorInternet='" + suitability.factorInternet
                          + "', factorPersonal='" + suitability.factorPersonal
                          + "', factorOther='" + suitability.factorOther
                          + "', summaryTransportation='" + suitability.summaryTransportation
                          + "', summaryChildcare='" + suitability.summaryChildcare
                          + "', summaryHealth='" + suitability.summaryHealth
                          + "', summaryOther='" + suitability.summaryOther
                          + "', points='" + suitability.points
                          + "' WHERE suitabilityID = '" + suitability.suitabilityID +"'"
                            new sql.Request(connection)
                                .query(query)
                                .then(function(recordset) {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Update suitability " + err);
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

}
export = ClientController;
