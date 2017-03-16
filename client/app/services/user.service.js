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
var http_1 = require("@angular/http");
var authentication_service_1 = require("./authentication.service");
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    function UserService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.usersUrl = 'api/users'; // URL to web app
    }
    UserService.prototype.getUsers = function () {
        // add authorization header with jwt token
        var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + this.authService.token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.usersUrl, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.usersUrl + '/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.save = function (user) {
        if (user._id) {
            return this.put(user);
        }
        return this.post(user);
    };
    UserService.prototype.post = function (user) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.usersUrl, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    UserService.prototype.put = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.usersUrl + "/" + user._id;
        return this.http
            .put(url, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(function () { return user; })
            .catch(this.handleError);
    };
    UserService.prototype.delete = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.usersUrl + "/" + user._id;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        authentication_service_1.AuthService])
], UserService);
exports.UserService = UserService;
