const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema({
    name: String,
    color: String
});
const departmentModel = mongoose.model("department", departmentSchema);


module.exports = departmentModel;
