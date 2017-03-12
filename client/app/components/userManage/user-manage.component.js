"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var UserManageComponent = (function () {
    function UserManageComponent(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    UserManageComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UserManageComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserManageComponent.prototype.gotoEdit = function (user, event) {
        this.router.navigate(['/userEdit', user._id]);
    };
    UserManageComponent.prototype.addUser = function () {
        this.router.navigate(['/userEdit', 'new']);
    };
    UserManageComponent.prototype.deleteUser = function (user, event) {
        var _this = this;
        event.stopPropagation();
        this.userService
            .delete(user)
            .then(function (res) {
            _this.users = _this.users.filter(function (h) { return h !== user; });
        })
            .catch(function (error) { return _this.error = error; });
    };
    UserManageComponent.prototype.goBack = function () {
        window.history.back();
    };
    return UserManageComponent;
}());
UserManageComponent = __decorate([
    core_1.Component({
        selector: 'user-manage',
        templateUrl: './app/components/userManage/user-manage.component.html',
        styleUrls: ['./app/components/userManage/user-manage.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService])
], UserManageComponent);
exports.UserManageComponent = UserManageComponent;
