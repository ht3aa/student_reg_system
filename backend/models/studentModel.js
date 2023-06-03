const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    birth_date: String,
    resident: String,
    average: String,
    personal_img_url: String,
    document_img_url: String,
    related_batch: String,
});
const studentModel = mongoose.model("student", studentSchema);


module.exports = studentModel;