const mongoose = require("mongoose");

const L1Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["L1"],
  },
  shift: {
    type: String,
    required: true,
    enum: ["Morning", "Afternoon", "Evening", "Night"],
  },
  manager: {
    type: String,
    required: true,
    enum: ["Anmol", "Imtiyaz"],
  },
  joiningDate: {
    type: Date,
    required: true,
  },
});

const L1 = mongoose.model("L1", L1Schema);

const L2Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["L2"],
  },
  shift: {
    type: String,
    required: true,
    enum: ["Morning", "Afternoon", "Evening", "Night"],
  },
  manager: {
    type: String,
    required: true,
    enum: ["Anmol", "Imtiyaz"],
  },
  joiningDate: {
    type: Date,
    required: true,
  },
});

const L2 = mongoose.model("L2", L2Schema);

module.exports = { L1, L2 };
