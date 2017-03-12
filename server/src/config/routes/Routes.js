"use strict";
var express = require("express");
var StudentRoutes = require("../routes/StudentRoutes");
var UserRoutes = require("../routes/UserRoutes");
var app = express();
var Routes = (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            app.use("/", new StudentRoutes().routes);
            app.use("/", new UserRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
module.exports = Routes;
