import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
var sql = require('mssql');
var auth = ["Admin", "Staff"];
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test2017531@gmail.com',
    pass: 'gc200282965'
  }
});

// var j = schedule.scheduleJob([{minute: 1}], function(){
//   let mailOptions = {
//     from: '"Test Ghost 👻" <ghost@test.com>', // sender address
//     to: 'chaodyz@gmail.com', // list of receivers
//     subject: 'SCHEDULER ✔', // Subject line
//     text: 'Sending every hour...', // plain text body
//     html: '<b>Hello world ?</b>' // html body
//   };
//
//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     } else {
//       return console.log('Message %s sent: %s', info.messageId, info.response);
//     }
//   });
// });

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

                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("INSERT INTO Users VALUES ('" + client.username + "','" + client.password + "','Client')").then(function() {
                            new sql.Request().query("SELECT userID FROM Users WHERE username = '" + client.username + "' AND password = '" + client.password + "'").then(function(id) {
                                var clientQuery = "'" + id[0].userID + "', '" +
                                    client.firstName + "', '" +
                                    client.lastName + "', '" +
                                    client.email + "', '" +
                                    client.inquiryDate + "', '" +
                                    client.birthday + "', '" +
                                    client.phone + "', '" +
                                    1 + "'";

                                    // setup email data with unicode symbols
                                    let mailOptions = {
                                      from: '"Test Ghost 👻" <ghost@test.com>', // sender address
                                      to: 'nicholasrowlandson@gmail.com', // list of receivers
                                      subject: 'Hello ✔', // Subject line
                                      text: 'Hello world ?', // plain text body
                                      html: '<b>Hello world ?</b>' // html body
                                    };

                                    // send mail with defined transport object
                                    transporter.sendMail(mailOptions, (error, info) => {
                                      if (error) {
                                        return console.log(error);
                                      } else {
                                        return console.log('Message %s sent: %s', info.messageId, info.response);
                                      }
                                    });

                                new sql.Request().query("INSERT INTO Clients VALUES (" + clientQuery + ")").then(function() {
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
                                    new sql.Request().query("INSERT INTO SuitabilityForm VALUES (" + suitabilityFormQuery + ")").then(function() {

                                    }).catch(function(err) {
                                        res.send({ "error": "error" }); console.log("insert suitabilityForm " + err);
                                    });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("insert client " + err);
                                    new sql.Request().query("DELETE FROM Users WHERE userID = '" + id[0] + "'").then(function() {
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
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("UPDATE Clients SET firstName='" + client.firstName + "', lastName='" + client.lastName + "', birthdate='" + client.birthday + "', email='" + client.email + "', phone='" + client.phone + "' WHERE studentID = '" + _id + "'").then(function(recordset) {
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
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("DELETE FROM Clients WHERE userID = '" + _id + "'").then(function() {
                            new sql.Request().query("DELETE FROM Users WHERE userID = '" + _id + "'").then(function() {
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
    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query('SELECT * FROM Clients').then(function(clients) {
                          new sql.Request().query('SELECT * FROM SuitabilityForm').then(function(suitabilityForms) {
                              res.send({clients: clients, suitabilityForms: suitabilityForms});
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
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("SELECT *  FROM Clients WHERE clientID = '" + _id + "'").then(function(recordset) {
                            res.send(recordset[0]);
                        }).catch(function(err) {
                            res.send({ "error": "error" }); console.log("Get client by id " + err);
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
