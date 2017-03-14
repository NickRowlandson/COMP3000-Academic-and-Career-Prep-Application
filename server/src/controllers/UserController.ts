import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");
import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/UserModel");
import jwt = require('jsonwebtoken');

class UserController implements IBaseController <UserBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            var user: IUserModel = <IUserModel>req.body;
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var user: IUserModel = <IUserModel>req.body;
            var _id: string = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, user, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
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
            var userBusiness = new UserBusiness();
            userBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            var userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
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
            var userBusiness = new UserBusiness();
            userBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    auth(req: express.Request, res: express.Response): void {
      try {
          var _username: string = req.body.username;
          var _password: string = req.body.password;
          var response;
          var userBusiness = new UserBusiness();

          userBusiness.retrieve((error, result) => {
            for (let object in result){
              if(_username === result[object].username && _password === result[object].password){
                var token = jwt.sign({ userid: result[object]._id }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                response = { status: 200, body: { token: token} };
              }else{
                response = { status: 404 }
              }
            }
            res.send(response);
          });
      }
      catch (e)  {
          console.log(e);
          res.send({"error": "error in your request"});
      }
    }

}
export = UserController;
