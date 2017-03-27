import express = require('express');
import path = require('path');

import StudentRoutes = require('../routes/StudentRoutes');
import StaffRoutes = require('../routes/StaffRoutes');
import AuthRoutes = require('../routes/AuthRoutes');
import UserRoutes = require('../routes/UserRoutes');
import ClientRoutes = require('../routes/ClientRoutes');

var app = express();

class Routes {

    get routes() {

        app.use("/", new StudentRoutes().routes);
        app.use("/", new StaffRoutes().routes);
        app.use("/", new AuthRoutes().routes);
        app.use("/", new UserRoutes().routes);
        app.use("/", new ClientRoutes().routes);

        return app;
    }
}
export = Routes;
