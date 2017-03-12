import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
}

export = UserModel;
