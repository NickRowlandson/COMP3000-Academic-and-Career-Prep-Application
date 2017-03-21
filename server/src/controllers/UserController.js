"use strict";
var UserBusiness = require("./../app/business/UserBusiness");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.create = function (req, res) {
        try {
            var salt = bcrypt.genSaltSync(10);
            var password = req.body.password;
            // Hash the password with the salt
            password = bcrypt.hashSync(password, salt);
            req.body.password = password;
            var user = req.body;
            console.log(user);
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
        try {
            var _username = req.body.username;
            var _password = req.body.password;
            var response;
            var userBusiness = new UserBusiness();
            userBusiness.retrieve(function (error, result) {
                for (var object in result) {
                    if (_username === result[object].username && bcrypt.compareSync(_password, result[object].password)) {
                        var token = jwt.sign({ userid: result[object]._id }, "f9b574a2fc0d77986cb7ebe21a0dea480f5f21931abfa5cf329a45ecc0c8e1ff");
                        response = { status: 200, body: { token: token } };
                        break;
                    }
                }
                if (!response) {
                    response = { status: 404 };
                }
                res.send(response);
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    };
    return UserController;
}());
module.exports = UserController;
//# sourceMappingURL=UserController.js.map