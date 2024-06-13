const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const athleteRoutes = require("./routes/athletes");
const coachRoutes = require("./routes/coaches");

app.use("/api/athletes", athleteRoutes);
app.use("/api/coaches", coachRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
