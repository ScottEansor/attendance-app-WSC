require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace with your MongoDB Atlas connection string
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// Athlete model
const athleteSchema = new mongoose.Schema({
  name: String,
  attendance: Array,
});

const Athlete = mongoose.model("Athlete", athleteSchema);

// Coach model
const coachSchema = new mongoose.Schema({
  coach_name: String,
  image: String,
});

const Coach = mongoose.model("Coach", coachSchema);

// Routes
app.get("/api/athletes", async (req, res) => {
  try {
    const athletes = await Athlete.find();
    res.json(athletes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/athletes", async (req, res) => {
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

app.get("/api/coaches", async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/coaches", async (req, res) => {
  const coach = new Coach({
    coach_name: req.body.name,
    image: req.body.image, // assuming you have an image field
  });
  try {
    const newCoach = await coach.save();
    res.status(201).json(newCoach);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
