const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchSchema = new Schema({
    name: String,
    color: String,
    related_department: String
});
const batchModel = mongoose.model("batch", batchSchema);


module.exports = batchModel;