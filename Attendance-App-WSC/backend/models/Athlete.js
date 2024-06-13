const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: String,
  attendance: [
    {
      date: String,
      coach: String,
    },
  ],
});

module.exports = mongoose.model("Athlete", athleteSchema);
