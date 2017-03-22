import DataAccess = require('../DataAccess');
import IStudentModel = require("./../../model/interfaces/StudentModel");

var mongoose = DataAccess.mongooseInstance;
var mongooseConnection = DataAccess.mongooseConnection;

class StudentSchema {

    static get schema () {
        var schema =  mongoose.Schema({
            authLevel : {
                type: String,
                required: true
            },
            enquiryDate : {
                type: String,
                required: true
            },
            username : {
                type: String,
                required: true
            },
            password : {
                type: String,
                required: true
            },
            firstName : {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            birthday: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        });

        return schema;
    }
}
var schema = mongooseConnection.model<IStudentModel>("Student", StudentSchema.schema);
export = schema;
