import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
var sql = require('mssql');
var auth = ["Admin"];

const config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
/**
    The staff controller communicates with the client
    side in order to manage all staff CRUD operations.
*/
class StaffController {

    /** Create new staff record */
    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var salt = bcrypt.genSaltSync(10);
                    var password = req.body.password;
                    // Hash the password with the salt
                    password = bcrypt.hashSync(password, salt);
                    req.body.password = password;
                    var staff = req.body;
                    sql.connect(config)
                    .then(function(connection) {
                      new sql.Request(connection)
                          .query("SELECT * FROM Users")
                          .then(function(users) {
                            var validated = true;
                            for (let user of users) {
                              if (user.username === staff.username) {
                                validated = false;
                                break;
                              }
                            }
                            if (validated) {
                              new sql.Request(connection)
                                  .query("INSERT INTO Users VALUES ('" + staff.username + "','" + staff.password + "','" + staff.authLevel + "')")
                                  .then(function() {
                                      new sql.Request(connection)
                                          .query("SELECT userID FROM Users WHERE username = '" + staff.username + "' AND password = '" + staff.password + "'")
                                          .then(function(id) {
                                              new sql.Request(connection)
                                                  .query("INSERT INTO Staff VALUES ('" + id[0].userID + "','" + staff.firstName + "', '" + staff.lastName + "','" + staff.email + "')")
                                                  .then(function() {
                                                      res.send({ "success": "success" });
                                                  }).catch(function(err) {
                                                      res.send({ "error": "error" });
                                                      console.log("insert staff " + err);
                                                  });
                                          }).catch(function(err) {
                                              res.send({ "error": "error" });
                                              console.log("get user " + err);
                                          });
                                  }).catch(function(err) {
                                      res.send({ "error": "error" });
                                      console.log("insert user " + err);
                                  });
                            } else {
                              res.send({"error": "username in use"})
                            }
                          }).catch(function(err) {
                              res.send({ "error": "error" });
                              console.log("select all users " + err);
                        });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    /** Update staff record by ID */
    update(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var staff = req.body;
                    var _id: string = req.params._id;
                    sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query("UPDATE Staff SET firstName='" + staff.firstName + "', lastName='" + staff.lastName + "', email='" + staff.email + "' WHERE staffID = '" + _id + "'")
                            .then(function() {
                                res.send({ "success": "success" });
                            }).catch(function(err) {
                                res.send({ "error": "error" });
                                console.log("Update staff " + err);
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    /** Delete selected record from Staff table by ID  */
    delete(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query("DELETE FROM Staff WHERE userID = '" + _id + "'")
                            .then(function() {
                                new sql.Request(connection)
                                    .query("DELETE FROM Users WHERE userID = '" + _id + "'")
                                    .then(function() {
                                        res.send({ "success": "success" });
                                    }).catch(function(err) {
                                        res.send({ "error": "error" });
                                        console.log("Delete user with id " + _id + ". " + err);
                                    });
                            }).catch(function(err) {
                                res.send({ "error": "error" });
                                console.log("Delete staff with id " + _id + ". " + err);
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    /** Get all staff records from Staff table */
    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query('SELECT Staff.*, Users.userType FROM Staff LEFT JOIN Users ON Users.userID = Staff.userID')
                            .then(function(recordset) {
                                res.send(recordset);
                            }).catch(function(err) {
                                res.send({ "error": "error" });
                                console.log("Select all staff " + err);
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    /** Get staff info by ID */
    findById(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query("SELECT *  FROM Staff WHERE staffID = '" + _id + "'")
                            .then(function(recordset) {
                                res.send(recordset[0]);
                            }).catch(function(err) {
                                res.send({ "error": "error" });
                                console.log("NOPE " + err);
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
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
export = StaffController;
