const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: String,
    role: String,
    role_name: String,
    department_name: String,
    related_department: String
});
const userModel = mongoose.model("user", userSchema);


module.exports = userModel;