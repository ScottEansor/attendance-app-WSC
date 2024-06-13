const express = require("express");
const router = express.Router();
const Coach = require("../models/Coach.js");

// Get all coaches
router.get("/", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
