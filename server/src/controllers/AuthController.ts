import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");
import StudentBusiness = require("./../app/business/StudentBusiness");
import IBaseController = require("./BaseController");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

class AuthController {
  auth(req: express.Request, res: express.Response): void {
    try {
        var _username: string = req.body.username;
        var _password: string = req.body.password;
        var response;
        var userBusiness = new UserBusiness();
        var studentBusiness = new StudentBusiness();

        if (!response) {
          userBusiness.retrieve((error, result) => {
            for (let object in result) {
              if(_username === result[object].username && bcrypt.compareSync(_password, result[object].password)){
                var token = jwt.sign({ userid: result[object]._id }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                response = { status: 200, body: { token: token} };
                break;
              }
            }
          });
          if (!response) {
            studentBusiness.retrieve((error, result) => {
              for (let object in result) {
                if(_username === result[object].username && bcrypt.compareSync(_password, result[object].password)){
                  var token = jwt.sign({ userid: result[object]._id }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                  response = { status: 200, body: { token: token} };
                  break;
                }
              }
              if (!response) {
                response = ({ status: 404 });
              }
              res.send(response);
            });
          }
        }
    }
    catch (e) {
        console.log(e);
        res.send({"error": "error in your request"});
    }
  }
}
export = AuthController;
