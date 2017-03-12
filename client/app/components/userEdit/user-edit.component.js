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
var User_1 = require("../../models/User");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var UserEditComponent = (function () {
    function UserEditComponent(userService, route) {
        this.userService = userService;
        this.route = route;
        this.newUser = false;
        this.navigated = false; // true if navigated here
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id === 'new') {
                _this.newUser = true;
                _this.user = new User_1.User();
            }
            else {
                _this.newUser = false;
                _this.userService.getUser(id)
                    .then(function (user) { return _this.user = user; });
            }
        });
    };
    UserEditComponent.prototype.save = function () {
        var _this = this;
        this.userService
            .save(this.user)
            .then(function (user) {
            _this.user = user; // saved user, w/ id if new
            _this.goBack();
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    UserEditComponent.prototype.goBack = function () {
        window.history.back();
    };
    return UserEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", User_1.User)
], UserEditComponent.prototype, "user", void 0);
UserEditComponent = __decorate([
    core_1.Component({
        selector: 'user-edit',
        templateUrl: './app/components/userEdit/user-edit.component.html',
        styleUrls: ['./app/components/userEdit/user-edit.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.ActivatedRoute])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
