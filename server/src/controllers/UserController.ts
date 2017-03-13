import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");
import IBaseController = require("./BaseController");
import IUserModel = require("./../app/model/interfaces/UserModel");

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
      var _username: string = req.params.username;
      var _password: string = req.params.password;
      var users;
      try {

          var userBusiness = new UserBusiness();
          userBusiness.retrieve((error, result) => {
              if(error) res.send({"error": "UH OH"});
              else users = result + " neat";
          });
      }
      catch (e)  {
          console.log(e);
          res.send({"error": "error in your request"});

      }

      let params = JSON.parse(users);
      console.log(params, _username, _password);

      // check user credentials and return fake jwt token if valid
      // if (params.username === testUser.username && params.password === testUser.password) {
      //     connection.mockRespond(new Response(
      //         new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
      //     ));
      // } else {
      //     connection.mockRespond(new Response(
      //         new ResponseOptions({ status: 200 })
      //     ));
      // }
    }
}
export = UserController;
