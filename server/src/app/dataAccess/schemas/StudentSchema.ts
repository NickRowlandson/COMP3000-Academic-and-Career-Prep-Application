import DataAccess = require('../DataAccess');
import IStudentModel = require("./../../model/interfaces/StudentModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StudentSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
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
    }
}
var schema = mongooseConnection.model<IStudentModel>("Student", StudentSchema.schema);
export = schema;""
