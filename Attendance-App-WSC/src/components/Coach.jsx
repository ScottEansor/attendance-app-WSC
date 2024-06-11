import React, { useState } from "react";

export default function Coach() {
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Placeholder data that will eventually be MongoDB
  const coaches = [
    { id: 1, name: "Scotty", image: "scottyimgexample.jpg" },
    { id: 2, name: "Tony", image: "tonyimgexample.jpg" },
  ];

  // date test
  const dates = ["2023-06-10", "2023-06-11", "2023-06-12"]; // Placeholder dates

  function handleCoachSelectChange(event) {
    setSelectedCoachId(event.target.value);
  }

  const selectedCoach = coaches.find((coach) => coach.id === +selectedCoachId);

  // date test
  function handleDateSelectChange(event) {
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
              {coach.name}
            </option>
          ))}
        </select>
      </div>

      {/* date test */}
      <div className="form-group mt-4">
        <label htmlFor="dateSelect">Select Date</label>
        <select
          id="dateSelect"
          className="form-control"
          onChange={handleDateSelectChange}
          value={selectedDate}
        >
          <option value="">Select a date</option>
          {dates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {selectedCoach && (
        <div className="card mt-4">
          <div className="card-body text-center">
            <img
              src={selectedCoach.image}
              alt={selectedCoach.name}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "100px" }}
            />
            <h1 className="card-title" style={{ fontWeight: "bold" }}>
              {selectedCoach.name}
            </h1>
          </div>
        </div>
      )}

      {/* date test */}
      {selectedDate && (
        <div className="card mt-4">
          <div className="card-body text-center">
            <h3 className="card-title" style={{ fontWeight: "bold" }}>
              Selected Date: {selectedDate}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
