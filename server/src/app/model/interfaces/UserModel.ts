import mongoose = require("mongoose");

interface UserModel extends mongoose.Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export = UserModel;
