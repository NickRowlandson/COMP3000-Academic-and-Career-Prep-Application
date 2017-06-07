import express = require('express');
import path = require('path');

import StudentRoutes = require('../routes/StudentRoutes');
import StaffRoutes = require('../routes/StaffRoutes');
import AuthRoutes = require('../routes/AuthRoutes');
import ClientRoutes = require('../routes/ClientRoutes');
import ClientFormsRoutes = require('../routes/ClientFormsRoutes');
import CourseRoutes = require('../routes/CourseRoutes');
var app = express();

class Routes {

    get routes() {

        app.use("/", new StudentRoutes().routes);
        app.use("/", new StaffRoutes().routes);
        app.use("/", new AuthRoutes().routes);
        app.use("/", new ClientRoutes().routes);
        app.use("/", new ClientFormsRoutes().routes);
        app.use("/", new CourseRoutes().routes);
        return app;
    }
}
export = Routes;
