const mongoose = require("mongoose");

const L2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    role: {
      type: String,
      required: true,
      enum: ["L2"], // Role is always L2 for L2 schema
    },
    shift: {
      type: String,
      required: true,
      enum: ["Morning", "Afternoon", "Evening", "Night"], // Allowed shifts
    },
    manager: {
      type: String,
      required: true,
      enum: ["Anmol", "Imtiyaz"], // Allowed managers
    },
    joiningDate: {
      type: Date,
      required: true, // Mandatory joining date field
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const L2 = mongoose.model("L2", L2Schema);

module.exports = L2;
