const router = require("express").Router();
const Timetable = require("../model.js");

router.post("/generate-timetable", async (req, res) => {
  try {
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2023-10"
    const previousMonth = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    )
      .toISOString()
      .slice(0, 7);
    // Fetch previous month's timetable
    const previousTimetable = await Timetable.findOne({ month: previousMonth });
    if (!previousTimetable) {
      return res.status(404).send("Previous month's timetable not found.");
    }
    // Round-robin shift of employee shifts
    const employees = previousTimetable.employees;
    // Apply round-robin shift on employee shifts
    const roundRobinShift = (employees) => {
      if (employees.length <= 1) return employees;
      const firstShift = employees[0].shift;
      for (let i = 1; i < employees.length; i++) {
        employees[i - 1].shift = employees[i].shift;
      }
      employees[employees.length - 1].shift = firstShift;
      return employees;
    };
    // Shifted employees for the new timetable
    const shiftedEmployees = roundRobinShift([...employees]);
    // Create new timetable for the current month
    const newTimetable = new Timetable({
      month: currentMonth,
      employees: shiftedEmployees,
    });
    await newTimetable.save();
    res.status(200).send(newTimetable);
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).send("An error occurred while generating the timetable.");
  }
});
router.get("/get-timetable", async (req, res) => {
  try {
    const timetables = await Timetable.find();
    const result = timetables.map((timetable) => {
      return timetable.employees.map((employee) => ({
        name: employee.name,
        shift: employee.shift,
      }));
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("An error occurred while fetching timetable.");
  }
});
module.exports = router;
