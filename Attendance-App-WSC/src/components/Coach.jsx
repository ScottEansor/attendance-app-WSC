import React, { useState, useEffect } from "react";

export default function Coach({ selectedDate, setSelectedDate }) {
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/coaches")
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  function handleCoachSelectChange(event) {
    setSelectedCoachId(event.target.value);
  }

  const selectedCoach = coaches.find((coach) => coach.id === +selectedCoachId);

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  return (
    <div className="coachContainer container my-4">
      <div className="form-group">
        <label htmlFor="coachSelect">Choose Coach</label>
        <select
          value={selectedCoachId}
          id="coachSelect"
          className="form-control"
          onChange={handleCoachSelectChange}
        >
          <option value="">Select a coach</option>
          {coaches.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.coach_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="dateInput">Select Date</label>
        <input
          type="date"
          id="dateInput"
          className="form-control"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {selectedCoach && (
        <div className="card mt-4">
          <div className="card-body text-center">
            {/* Assume there's no image for now */}
            {/* <img
              src={selectedCoach.image}
              alt={selectedCoach.coach_name}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "100px" }}
            /> */}
            <h1 className="card-title" style={{ fontWeight: "bold" }}>
              {selectedCoach.coach_name}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
