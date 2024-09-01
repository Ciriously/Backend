require("dotenv").config();

const { L1, L2 } = require("./model");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.use(cors());
app.use(express.json());

// Route handlers
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/get-emp", async (req, res) => {
  try {
    const emp = await L1.find().sort({ name: 1 });
    res.send(emp);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("An error occurred while fetching employees.");
  }
});

app.post("/", async (req, res) => {
  try {
    const l2 = await L2.create(req.body);
    console.log("Data successfully sent:", l2);
    res.status(200).send(l2);
  } catch (error) {
    console.error("Error sending data:", error);
    res.status(500).send("An error occurred while creating data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
});
