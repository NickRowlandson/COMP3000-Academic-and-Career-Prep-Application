import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

var sql = require('mssql');

class UserController {

    findCurrentUserId(req: express.Request, res: express.Response): void {
        try {
            var token: string = req.params.token;
            jwt.verify(token, 'f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff', function(err, decoded) {
                var _id = decoded.userid;
                sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                    new sql.Request().query("SELECT * FROM Users WHERE userID = '" + _id + "'").then(function(authLevel) {
                        res.send(authLevel[0]);
                    }).catch(function(err) {
                        res.send({ "error": "error" }); console.log("Could not find user with id " + _id + ". " + err);
                    });
                }).catch(function(err) {
                    console.log(err);
                    res.send({ "error": "error in your request" });
                });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
}
export = UserController;
