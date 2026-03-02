const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  patientEmail: String,
  patientName: String,
  appointments: [
    {
      appointment_id: String,
      date: Date,
      doctor: String,
      treatment: String,
      amountPaid: Number
    }
  ]
});

module.exports = mongoose.model("PatientHistory", historySchema);