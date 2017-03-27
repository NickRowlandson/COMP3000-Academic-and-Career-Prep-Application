import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

var AuthController = require("../controllers/AuthController");
var sql = require('mssql');

class UserController {

    retrieve(req: express.Request, res: express.Response): void {
        try {
          AuthController.authUser(req, res, {authLevel: 'admin', userType: 'user', done: function(){
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query('SELECT * FROM Staff').then(function(recordset) {
                  res.send(recordset);
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Select all staff " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error in your request"});
            });
          }});
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("SELECT * FROM Users WHERE userID = '"+_id+"'").then(function(authLevel) {
                  res.send(authLevel[0]);
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("NOPE " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error in your request"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }

}
export = UserController;
