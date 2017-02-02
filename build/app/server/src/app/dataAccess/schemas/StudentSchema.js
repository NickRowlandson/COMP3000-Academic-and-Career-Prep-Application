System.register(["../DataAccess"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DataAccess, mongoose, mongooseConnection, StudentSchema, schema;
    return {
        setters: [
            function (DataAccess_1) {
                DataAccess = DataAccess_1;
            }
        ],
        execute: function () {
            mongoose = DataAccess.mongooseInstance;
            mongooseConnection = DataAccess.mongooseConnection;
            StudentSchema = (function () {
                function StudentSchema() {
                }
                Object.defineProperty(StudentSchema, "schema", {
                    get: function () {
                        var schema = mongoose.Schema({
                            name: {
                                type: String,
                                required: true
                            },
                            power: {
                                type: String,
                                required: true
                            },
                            amountPeopleSaved: {
                                type: Number,
                                required: true
                            }
                        });
                        return schema;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StudentSchema;
            }());
            schema = mongooseConnection.model("Students", StudentSchema.schema);
            exports_1("default", schema);
        }
    };
});
//# sourceMappingURL=StudentSchema.js.map