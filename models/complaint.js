const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  personName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  complaintName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateOccurred: {
    type: Date,
    required: true
  },
  dateSubmitted: {
    type: Date,
    default: Date.now
  }
});

const Complaint = mongoose.model("Complaint" ,complaintSchema);
module.exports = Complaint;

