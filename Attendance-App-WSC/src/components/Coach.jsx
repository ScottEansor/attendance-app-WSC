import React, { useState } from "react";

export default function Coach() {
  const [selectedCoach, setSelectedCoach] = useState(null);

  // Placeholder data that will eventually be MongoDB
  const coaches = [
    { id: 1, name: "Scotty", image: "scottyimgexample.jpg" },
    { id: 2, name: "Tony", image: "tonyimgexample.jpg" },
  ];

  function handleCoachSelectChange(event) {
    const selectedCoachId = parseInt(event.target.value);
    const selectedCoach = coaches.find((coach) => coach.id === selectedCoachId);
    setSelectedCoach(selectedCoach);
  }

  return (
    <div className="coachContainer container my-4">
      <div className="form-group">
        <label htmlFor="coachSelect">Choose Coach</label>
        <select
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
      {selectedCoach && (
        <div className="card mt-4">
          <div className="card-body text-center">
            <img
              src={selectedCoach.image}
              alt={selectedCoach.name}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "100px" }}
            />
            <h1 className="card-title">{selectedCoach.name}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
