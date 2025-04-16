import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  certificateUrl: {
    type: String,
    required: true,
  },
  marksheetUrl: {
    type: String,
    required: true,
  }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
