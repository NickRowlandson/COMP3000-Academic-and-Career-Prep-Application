System.register(["mongoose", "../../config/constants/constants"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Mongoose, Constants, DataAccess;
    return {
        setters: [
            function (Mongoose_1) {
                Mongoose = Mongoose_1;
            },
            function (Constants_1) {
                Constants = Constants_1;
            }
        ],
        execute: function () {
            DataAccess = (function () {
                function DataAccess() {
                    DataAccess.connect();
                }
                DataAccess.connect = function () {
                    if (this.mongooseInstance)
                        return this.mongooseInstance;
                    this.mongooseConnection = Mongoose.connection;
                    this.mongooseConnection.once("open", function () {
                        console.log("Connected to mongodb.");
                    });
                    this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING);
                    return this.mongooseInstance;
                };
                return DataAccess;
            }());
            DataAccess.connect();
            exports_1("default", DataAccess);
        }
    };
});
//# sourceMappingURL=DataAccess.js.map