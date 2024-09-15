const mongoose = require("mongoose");

// Define the schema for the employee model
const EmpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures each employee has a unique email
    },
    role: {
      type: String,
      required: true,
      enum: ["L1", "L2"], // Restrict to L1 or L2 roles
    },
    shift: {
      type: String,
      required: true,
      enum: ["Morning", "Afternoon", "Evening", "Night"], // Restrict to valid shifts
    },
    manager: {
      type: String,
      required: true,
      enum: ["Anmol", "Imtiyaz"], // Restrict to valid managers
    },
    joiningDate: {
      type: Date,
      required: true, // Mandatory field for the employee's joining date
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create and export the Emp model
const Emp = mongoose.model("Emp", EmpSchema);

module.exports = Emp;
