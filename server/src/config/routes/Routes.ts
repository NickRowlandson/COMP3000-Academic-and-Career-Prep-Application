import express = require('express');
import path = require('path');

import StudentRoutes = require('../routes/StudentRoutes');
import UserRoutes = require('../routes/UserRoutes');
import AuthRoutes = require('../routes/AuthRoutes');

var app = express();

class Routes {

    get routes() {

        app.use("/", new StudentRoutes().routes);
        app.use("/", new UserRoutes().routes);
        app.use("/", new AuthRoutes().routes);

        return app;
    }
}
export = Routes;
