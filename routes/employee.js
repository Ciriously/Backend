const router = require("express").Router();
const { L1 } = require("../model.js");
const { Timetable } = require("../model.js");

// Fetch all L1 and L2 employees
router.get("/get-employees", async (req, res) => {
  try {
    const l1Emp = await L1.find().sort({ name: 1 });
    res.status(200).send(l1Emp);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send(error);
  }
});
// Add a new employee
router.post("/add-employee", async (req, res) => {
  try {
    const newL1Employee = await L1.create(req.body);
    res.status(200).send(newL1Employee);
  } catch (error) {
    res.status(500).send("An error occurred while creating L1 employee data.");
  }
});
router.post("/initialize-employees", async (req, res) => {
  try {
    const employees = req.body; // Expecting an array of employees with name and shift
    // await Employee.insertMany(employees);
    const currentMonth = new Date().toISOString().slice(0, 7);
    const timetable = new Timetable({
      month: currentMonth,
      employees: employees,
    });
    await timetable.save();
    res.status(200).send(timetable);
  } catch (error) {
    console.error("Error initializing employees:", error);
    res.status(500).send("An error occurred while initializing employees.");
  }
});

module.exports = router;
