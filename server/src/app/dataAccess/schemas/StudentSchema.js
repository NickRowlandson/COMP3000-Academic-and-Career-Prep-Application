"use strict";
var DataAccess = require("../DataAccess");
var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;
var StudentSchema = (function () {
    function StudentSchema() {
    }
    Object.defineProperty(StudentSchema, "schema", {
        get: function () {
            var schema = mongoose.Schema({
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                studentNumber: {
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
var schema = mongooseConnection.model("Student", StudentSchema.schema);
"";
module.exports = schema;
//# sourceMappingURL=StudentSchema.js.map