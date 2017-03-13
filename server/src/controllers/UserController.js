"use strict";
var UserBusiness = require("./../app/business/UserBusiness");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.create = function (req, res) {
        try {
            var user = req.body;
            var userBusiness = new UserBusiness();
            userBusiness.create(user, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.update = function (req, res) {
        try {
            var user = req.body;
            var _id = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.update(_id, user, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.delete = function (req, res) {
        try {
            var _id = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.delete(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.retrieve = function (req, res) {
        try {
            var userBusiness = new UserBusiness();
            userBusiness.retrieve(function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.findById = function (req, res) {
        try {
            var _id = req.params._id;
            var userBusiness = new UserBusiness();
            userBusiness.findById(_id, function (error, result) {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    UserController.prototype.auth = function (req, res) {
        var _username = req.params.username;
        var _password = req.params.password;
        var users;
        try {
            var userBusiness = new UserBusiness();
            userBusiness.retrieve(function (error, result) {
                if (error)
                    res.send({ "error": "UH OH" });
                else
                    users = result + " neat";
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
        var params = JSON.parse(users);
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
    };
    return UserController;
}());
module.exports = UserController;
