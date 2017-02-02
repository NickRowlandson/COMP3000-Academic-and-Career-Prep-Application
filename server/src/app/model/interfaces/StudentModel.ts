import mongoose = require("mongoose");

interface StudentModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    studentNumber: number;
}

export = StudentModel;
