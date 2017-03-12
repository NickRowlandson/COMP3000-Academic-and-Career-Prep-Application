"use strict";
var UserRepository = require("./../repository/UserRepository");
var UserBusiness = (function () {
    function UserBusiness() {
        this._userRepository = new UserRepository();
    }
    UserBusiness.prototype.create = function (item, callback) {
        this._userRepository.create(item, callback);
    };
    UserBusiness.prototype.retrieve = function (callback) {
        this._userRepository.retrieve(callback);
    };
    UserBusiness.prototype.update = function (_id, item, callback) {
        var _this = this;
        this._userRepository.findById(_id, function (err, res) {
            if (err)
                callback(err, res);
            else
                _this._userRepository.update(res._id, item, callback);
        });
    };
    UserBusiness.prototype.delete = function (_id, callback) {
        this._userRepository.delete(_id, callback);
    };
    UserBusiness.prototype.findById = function (_id, callback) {
        this._userRepository.findById(_id, callback);
    };
    return UserBusiness;
}());
Object.seal(UserBusiness);
module.exports = UserBusiness;
