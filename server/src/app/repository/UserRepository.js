"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserSchema = require("./../dataAccess/schemas/UserSchema");
var RepositoryBase = require("./BaseRepository");
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super.call(this, UserSchema) || this;
    }
    return UserRepository;
}(RepositoryBase));
Object.seal(UserRepository);
module.exports = UserRepository;
