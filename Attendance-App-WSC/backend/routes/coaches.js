const express = require("express");
const router = express.Router();
const Coach = require("../models/Coach");

// Get all coaches
router.get("/", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new coach
router.post("/", async (req, res) => {
  const coach = new Coach({
    name: req.body.name,
  });
  try {
    const newCoach = await coach.save();
    res.status(201).json(newCoach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
