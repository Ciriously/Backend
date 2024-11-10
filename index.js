require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeRoutes = require("./routes/employee");
const TimeTableRoutes = require("./routes/timetable");

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

app.use("/", EmployeeRoutes);
app.use("/", TimeTableRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
