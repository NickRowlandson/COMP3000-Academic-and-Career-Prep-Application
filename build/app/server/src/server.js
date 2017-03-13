/// <reference path="../typings/index.d.ts" />
System.register(["express", "./config/routes/Routes", "body-parser", "path"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, BaseRoutes, bodyParser, path, port, env, app, renderIndex;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (BaseRoutes_1) {
                BaseRoutes = BaseRoutes_1;
            },
            function (bodyParser_1) {
                bodyParser = bodyParser_1;
            },
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {/// <reference path="../typings/index.d.ts" />
            port = process.env.PORT || 3000;
            env = process.env.NODE_ENV || 'developement';
            app = express();
            exports_1("app", app);
            app.set('port', port);
            app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
            app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
            // for system.js to work. Can be removed if bundling.
            app.use(express.static(path.resolve(__dirname, '../client')));
            app.use(express.static(path.resolve(__dirname, '../../node_modules')));
            app.use(bodyParser.json());
            app.use('/api', new BaseRoutes().routes);
            renderIndex = function (req, res) {
                res.sendFile(path.resolve(__dirname, '../client/index.html'));
            };
            app.get('/*', renderIndex);
            if (env === 'developement') {
                app.use(function (err, req, res, next) {
                    res.status(err.status || 500);
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
        }
    };
});
//# sourceMappingURL=server.js.map