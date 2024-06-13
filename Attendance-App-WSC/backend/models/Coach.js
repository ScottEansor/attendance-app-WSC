const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Coach", coachSchema);
