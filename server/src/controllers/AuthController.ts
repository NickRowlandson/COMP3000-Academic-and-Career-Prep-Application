import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
var sql = require('mssql');

const config = {
    user: '',
    password: '',
    server: '', // You can use 'localhost\\instance' to connect to named instance
    database: '',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

class AuthController {

    // Login Authentication
    auth(req: express.Request, res: express.Response): void {
        try {
            var _username: string = req.body.username;
            var _password: string = req.body.password;
            var response;

            sql.connect(config).then(function(connection) {
                new sql.Request(connection)
                    .query("SELECT * FROM Users WHERE username = '" + _username + "'")
                    .then(function(user) {
                        if (bcrypt.compareSync(_password, user[0].password)) {
                            var token = jwt.sign({ userid: user[0].userID }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                            var statusToken = { status: 200, body: { token: token, userID: user[0].userID, username: user[0].username, userType: user[0].userType } };
                            response = JSON.stringify(statusToken);
                        } else {
                            response = false;
                        }
                        res.send(response);
                    }).catch(function(err) {
                        response = { "error": err };
                        res.send(response);
                    });
            }).catch(function(err) {
                response = { "error": err };
                res.send(response);
            });

        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    //Decode token and check if user is authorized
    authUser(req: express.Request, res: express.Response, data): void {
        try {
            if (req.headers && req.headers.authorization) {
                jwt.verify(req.headers.authorization, 'f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff', function(err, decoded) {
                    if(err) {
                      return res.send({error: "There was an error"});
                    } else {
                      if(decoded === null || Object.keys(decoded).length === 0) {
                        return res.send({error: "No values in token"});
                      }
                    }
                    var _id = decoded.userid;
                    var query = "SELECT * FROM Users WHERE userID = '" + _id + "'";
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(query)
                                .then(function(user) {
                                    if (data.requiredAuth.indexOf(user[0].userType) > -1) {
                                      try {
                                        data.done();
                                      } catch(err) {
                                        console.log(err.stack);
                                        throw "There was an issue in the logic done after the authentication"; // This will throw to catch on line 83
                                      }
                                    }
                                    else {
                                        res.send({ status: '403' });
                                    }
                                }).catch(err => {
                                    res.send({ "error": "error" });
                                    console.log(" " + err);
                                });
                        });
                });
            } else {
              res.send({error: "No auth header"});
            }
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
}
export = AuthController;
