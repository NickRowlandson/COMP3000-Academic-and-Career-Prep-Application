import mongoose = require("mongoose");

interface StudentModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    studentNumber: number;
    email: string;
}

export = StudentModel;
