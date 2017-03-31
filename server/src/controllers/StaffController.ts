import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
var sql = require('mssql');

class StaffController {

    create(req: express.Request, res: express.Response): void {
        try {
          new AuthController().authUser(req, res, {authLevel1: 'Admin', authLevel2: '', userType: 'Staff', done: function(){
            var salt = bcrypt.genSaltSync(10);
            var password = req.body.password;
            // Hash the password with the salt
            password = bcrypt.hashSync(password, salt);
            req.body.password = password;
            var staff = req.body;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("INSERT INTO Users VALUES ('"+staff.username+"','"+staff.password+"','Staff','"+staff.authLevel+"')").then(function() {
                new sql.Request().query("SELECT userID FROM Users WHERE username = '"+staff.username+"' AND password = '"+staff.password+"'").then(function(id) {
                  new sql.Request().query("INSERT INTO Staff VALUES ('"+id[0].userID+"','"+staff.firstName+"', '"+staff.lastName+"','"+staff.email+"')").then(function() {
                    res.send({"success": "success"});
                  }).catch(function(err) {
                    res.send({"error": "error"}); console.log("insert staff " + err);
                  });
                }).catch(function(err) {
                    res.send({"error": "error"}); console.log("get user " + err);
                });
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("insert user " + err);
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

    update(req: express.Request, res: express.Response): void {
        try {
          new AuthController().authUser(req, res, {authLevel1: 'Admin', authLevel2: '', userType: 'Staff', done: function(){
            var staff = req.body;
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("UPDATE Staff SET firstName='"+staff.firstName+"', lastName='"+staff.lastName+"', email='"+staff.email+"' WHERE staffID = '"+_id+"'").then(function() {
                  res.send({"success": "success"});
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Update staff " + err);
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

    delete(req: express.Request, res: express.Response): void {
        try {
          new AuthController().authUser(req, res, {authLevel1: 'Admin', authLevel2: '', userType: 'Staff', done: function(){
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("DELETE FROM Staff WHERE userID = '"+_id+"'").then(function() {
                new sql.Request().query("DELETE FROM Users WHERE userID = '"+_id+"'").then(function() {
                    res.send({"success": "success"});
                }).catch(function(err) {
                    res.send({"error": "error"}); console.log("Delete user with id "+ _id + ". " + err);
                });
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Delete staff with id "+ _id + ". "  + err);
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

    retrieve(req: express.Request, res: express.Response): void {
        try {
          new AuthController().authUser(req, res, {authLevel1: 'Admin', authLevel2: '', userType: 'Staff', done: function(){
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
          new AuthController().authUser(req, res, {authLevel1: 'Admin', authLevel2: '', userType: 'Staff', done: function(){
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("SELECT *  FROM Staff WHERE staffID = '"+_id+"'").then(function(recordset) {
                  res.send(recordset[0]);
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("NOPE " + err);
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

}
export = StaffController;
