import express = require('express');
import path = require('path');

import StudentRoutes = require('../routes/StudentRoutes');

var app = express();

class Routes {

    get routes() {

        app.use("/", new StudentRoutes().routes);

        return app;
    }
}
export = Routes;
