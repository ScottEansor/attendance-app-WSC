const express = require("express");
const router = express.Router();
const Athlete = require("../models/Athlete");

// Get all athletes
router.get("/", async (req, res) => {
  try {
    const athletes = await Athlete.find();
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new athlete
router.post("/", async (req, res) => {
  const athlete = new Athlete({
    name: req.body.name,
  });
  try {
    const newAthlete = await athlete.save();
    res.status(201).json(newAthlete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add attendance for an athlete
router.post("/:id/attendance", async (req, res) => {
  try {
    const athlete = await Athlete.findById(req.params.id);
    if (!athlete) return res.status(404).json({ message: "Athlete not found" });

    athlete.attendance.push(req.body);
    await athlete.save();
    res.status(201).json(athlete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
