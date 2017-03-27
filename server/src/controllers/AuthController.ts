import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
var sql = require('mssql');

class AuthController {
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
                var statusToken = { status: 200, body: { token: token} };
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

  authUser(req: express.Request, res: express.Response, data: Object): void {
    try {
      console.log(req.headers.authorization);
      // data will contain authLevel usertype that are required
      // data will also have callback function
      // check for auth header
        // if auth header, get token and decode it
        // if decode
          // get user id from decoded token and check
            // if authLevel and userType valid
              // data.done()
            //else
              // res.send(unauthorized)
        // else
          // send unauthorized res
    // sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
    //   new sql.Request().query('SELECT authLevel, userType FROM Users WHERE userID = "'userID'"').then(function(user) {
    //
    //   }).catch(function(err) {
    //       res.send({"error": err});
    //   });
    // });
    }
    catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }
}
export = AuthController;
