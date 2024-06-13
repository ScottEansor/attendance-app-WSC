import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Coach from "./components/Coach";
import AthleteList from "./components/AthleteList";
import Tracking from "./components/Tracking";

function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState({});

  const handleAddAttendance = (athlete, coach) => {
    setAttendance((prevAttendance) => {
      const newAttendance = { ...prevAttendance };
      if (!newAttendance[selectedDate]) {
        newAttendance[selectedDate] = {};
      }
      if (!newAttendance[selectedDate][coach.coach_name]) {
        newAttendance[selectedDate][coach.coach_name] = [];
      }
      newAttendance[selectedDate][coach.coach_name].push(athlete);
      return newAttendance;
    });
  };

  const handleRemoveAttendance = (athlete, coach) => {
    setAttendance((prevAttendance) => {
      const newAttendance = { ...prevAttendance };
      if (
        newAttendance[selectedDate] &&
        newAttendance[selectedDate][coach.coach_name]
      ) {
        newAttendance[selectedDate][coach.coach_name] = newAttendance[
          selectedDate
        ][coach.coach_name].filter((a) => a.id !== athlete.id);
      }
      return newAttendance;
    });
  };

  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Coach
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
                <AthleteList
                  selectedDate={selectedDate}
                  handleAddAttendance={handleAddAttendance}
                  handleRemoveAttendance={handleRemoveAttendance}
                />
              </>
            }
          />
          <Route
            path="/tracking"
            element={
              <Tracking attendance={attendance} selectedDate={selectedDate} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
