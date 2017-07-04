import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
var sql = require('mssql');
var auth = ["Admin"];

class CourseController {
    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function () {
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function (connection) {
                        new sql.Request(connection).query('SELECT * FROM Course').then(function (recordset) {
                            res.send(recordset);
                        }).catch(function (err) {
                            res.send({ "error": "error" }); console.log("Select all course " + err);
                        });
                    }).catch(function (err) {
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

export = CourseController;
