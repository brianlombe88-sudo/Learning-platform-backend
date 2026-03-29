const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
