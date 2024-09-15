require("dotenv").config();

const { L1, L2 } = require("./model"); // Importing L1 and L2 models
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(cors());
app.use(express.json());

// Route Handlers
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Fetch all L1 and L2 employees
app.get("/get-emp", async (req, res) => {
  try {
    const l1Emp = await L1.find().sort({ name: 1 }); // Fetch and sort L1 employees by name
    const l2Emp = await L2.find().sort({ name: 1 }); // Fetch and sort L2 employees by name

    const employees = [...l1Emp, ...l2Emp]; // Combine L1 and L2 employees
    res.status(200).send(employees); // Send combined employee data as response
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("An error occurred while fetching employees.");
  }
});

// Add a new L1 employee
app.post("/l1", async (req, res) => {
  try {
    const newL1Employee = await L1.create(req.body); // Create a new L1 employee
    console.log("L1 Data successfully created:", newL1Employee);
    res.status(200).send(newL1Employee);
  } catch (error) {
    console.error("Error creating L1 employee:", error);
    res.status(500).send("An error occurred while creating L1 employee data.");
  }
});

// Add a new L2 employee
app.post("/l2", async (req, res) => {
  try {
    const newL2Employee = await L2.create(req.body); // Create a new L2 employee
    console.log("L2 Data successfully created:", newL2Employee);
    res.status(200).send(newL2Employee);
  } catch (error) {
    console.error("Error creating L2 employee:", error);
    res.status(500).send("An error occurred while creating L2 employee data.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
});
