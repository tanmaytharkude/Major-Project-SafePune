const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating : {
    type : Number,
    min : 1,
    max : 5,
    required : true
  },
});

const Report = mongoose.model("Report" ,reportSchema);
module.exports = Report;