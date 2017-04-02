import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
var sql = require('mssql');
var auth = ["Admin", "Staff"];

class StudentController {

    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var salt = bcrypt.genSaltSync(10);
                    var password = req.body.password;
                    // Hash the password with the salt
                    password = bcrypt.hashSync(password, salt);
                    req.body.password = password;
                    var student = req.body;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("INSERT INTO Users VALUES ('" + student.username + "','" + student.password + "','Student')").then(function() {
                            new sql.Request().query("SELECT userID FROM Users WHERE username = '" + student.username + "' AND password = '" + student.password + "'").then(function(id) {
                                new sql.Request().query("INSERT INTO Students VALUES ('" + id[0].userID + "','" + student.firstName + "', '" + student.lastName + "','" + student.email + "','" + student.inquiryDate + "','" + student.birthday + "','" + student.phone + "')").then(function() {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("insert student " + err);
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
                    var student = req.body;
                    var _id: string = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query("UPDATE Students SET firstName='" + student.firstName + "', lastName='" + student.lastName + "', birthdate='" + student.birthday + "', email='" + student.email + "', phone='" + student.phone + "' WHERE studentID = '" + _id + "'").then(function(recordset) {
                            res.send({ "success": "success" });
                        }).catch(function(err) {
                            res.send({ "error": "error" }); console.log("Update student " + err);
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
                        new sql.Request().query("DELETE FROM Students WHERE userID = '" + _id + "'").then(function() {
                            new sql.Request().query("DELETE FROM Users WHERE userID = '" + _id + "'").then(function() {
                                res.send({ "success": "success" });
                            }).catch(function(err) {
                                res.send({ "error": "error" }); console.log("Delete user with id "+ _id + ". " + err);
                            });
                        }).catch(function(err) {
                            res.send({ "error": "error" }); console.log("Delete student with id "+ _id + ". " + err);
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
                        new sql.Request().query('SELECT * FROM Students').then(function(recordset) {
                            res.send(recordset);
                        }).catch(function(err) {
                            res.send({ "error": "error" }); console.log("Get students " + err);
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
                        new sql.Request().query("SELECT *  FROM Students WHERE studentID = '" + _id + "'").then(function(recordset) {
                            res.send(recordset[0]);
                        }).catch(function(err) {
                            res.send({ "error": "error" }); console.log("Get student by id " + err);
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
export = StudentController;
