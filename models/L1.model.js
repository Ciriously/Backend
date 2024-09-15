const mongoose = require("mongoose");

// Define the schema for L1 employees
const L1Schema = new mongoose.Schema(
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
      enum: ["L1"], // Role is always L1 for L1 schema
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
const L1 = mongoose.model("L1", L1Schema);

module.exports = L1;
