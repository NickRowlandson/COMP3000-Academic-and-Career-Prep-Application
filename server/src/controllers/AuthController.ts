import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
var sql = require('mssql');

class AuthController {

  // Login Authentication
  auth(req: express.Request, res: express.Response): void {
    try {
      var _username: string = req.body.username;
      var _password: string = req.body.password;
      var response;

      sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
        new sql.Request().query('SELECT * FROM Users').then(function(user) {
            for (let object in user) {
              if(_username === user[object].username && bcrypt.compareSync(_password, user[object].password)){
                var token = jwt.sign({ userid: user[object].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                var statusToken = { status: 200, body: { token: token, username: user[object].username, userType: user[object].userType } };
                response = JSON.stringify(statusToken);
                res.send(response);
                break;
              }
            }
        }).catch(function(err) {
            response = {"error": err};
            res.send(response);
        });
      }).catch(function(err) {
          response = {"error": err};
          res.send(response);
      });

    }
    catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }

  //Decode token and check if user is authorized
  authUser(req: express.Request, res: express.Response, data: Object): void {
    try {
      if(req.headers) {
        jwt.verify(req.headers.authorization, 'f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff', function(err, decoded) {
          var _id = decoded.userid;
          sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
            new sql.Request().query("SELECT * FROM Users WHERE userID = '"+_id+"'").then(function(user) {
              if(data.requiredAuth.indexOf(user[0].userType) > -1) {
                data.done();
              }
              else {
                res.send({status: '403'});
              }
            }).catch(function(err) {
                res.send({"error": "error"}); console.log("Authenticate user 'Select staff' statement " + err);
            });
          });
        });
      }
    }
    catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }
}
export = AuthController;
