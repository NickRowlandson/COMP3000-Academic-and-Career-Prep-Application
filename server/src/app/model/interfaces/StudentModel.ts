import mongoose = require("mongoose");

interface StudentModel extends mongoose.Document {
    authLevel: string;
    enquiryDate: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
}

export = StudentModel;
