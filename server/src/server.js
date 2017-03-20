/// <reference path="../typings/index.d.ts" />
"use strict";
var express = require("express");
var BaseRoutes = require("./config/routes/Routes");
var bodyParser = require("body-parser");
var path = require("path");
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'developement';
var app = express();
exports.app = app;
app.set('port', port);
app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));
app.use(bodyParser.json());
app.use('/api', new BaseRoutes().routes);
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
};
app.get('/*', renderIndex);
if (env === 'developement') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
//# sourceMappingURL=server.js.map