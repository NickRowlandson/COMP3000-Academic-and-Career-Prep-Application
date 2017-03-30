import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
var sql = require('mssql');

class ClientController {
    create(req: express.Request, res: express.Response): void {
        try {
            var salt = bcrypt.genSaltSync(10);
            var password = req.body.password;
            // Hash the password with the salt
            password = bcrypt.hashSync(password, salt);
            req.body.password = password;
            var client = req.body;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("INSERT INTO Users VALUES ('"+client.username+"','"+client.password+"','client','client')").then(function() {
                new sql.Request().query("SELECT userID FROM Users WHERE username = '"+client.username+"' AND password = '"+client.password+"'").then(function(id) {
                  new sql.Request().query("INSERT INTO Clients VALUES ('"+id[0].userID+"','"+client.firstName+"', '"+client.lastName+"','"+client.email+"','"+client.inquiryDate+"','"+client.birthday+"','"+client.phone+"')").then(function() {
                    res.send({"success": "success"});
                  }).catch(function(err) {
                    res.send({"error": "error"}); console.log("insert client " + err);
                  });
                }).catch(function(err) {
                    res.send({"error": "error"}); console.log("get user " + err);
                });
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("insert user " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
    update(req: express.Request, res: express.Response): void {
        try {
            var client = req.body;
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("UPDATE Clients SET firstName='"+client.firstName+"', lastName='"+client.lastName+"', birthdate='"+client.birthday+"', email='"+client.email+"', phone='"+client.phone+"' WHERE studentID = '"+_id+"'").then(function(recordset) {
                  res.send({"success": "success"});
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Update client " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              new sql.Request().query("DELETE FROM Clients WHERE clientID = '"+_id+"'").then(function() {
                new sql.Request().query("DELETE FROM Users WHERE userID = '"+_id+"'").then(function() {
                    res.send({"success": "success"});
                }).catch(function(err) {
                    res.send({"error": "error"}); console.log("Delete user " + err);
                });
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Delete client " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {
          sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
            new sql.Request().query('SELECT * FROM Clients').then(function(recordset) {
                res.send(recordset);
            }).catch(function(err) {
                res.send({"error": "error"}); console.log("Get clients " + err);
            });
          }).catch(function(err) {
              console.log(err);
              res.send({"error": "error"});
          });
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
              new sql.Request().query("SELECT *  FROM Clients WHERE clientID = '"+_id+"'").then(function(recordset) {
                  res.send(recordset[0]);
              }).catch(function(err) {
                  res.send({"error": "error"}); console.log("Get client by id " + err);
              });
            }).catch(function(err) {
                console.log(err);
                res.send({"error": "error"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});
        }
    }
}
export = ClientController;
