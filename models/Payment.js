const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
