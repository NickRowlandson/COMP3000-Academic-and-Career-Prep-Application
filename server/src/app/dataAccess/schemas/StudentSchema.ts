import DataAccess = require('../DataAccess');
import IStudentModel = require("./../../model/interfaces/StudentModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StudentSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            firstName : {
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
    }
}
var schema = mongooseConnection.model<IStudentModel>("Student", StudentSchema.schema);
export = schema;""
