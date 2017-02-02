import mongoose = require("mongoose");

interface StudentModel extends mongoose.Document {
    power: string;
    amountPeopleSaved: number;
    name: string;
}

export = StudentModel;
