import React, { useState, useEffect } from "react";

export default function AthleteList({
  selectedDate,
  handleAddAttendance,
  handleRemoveAttendance,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAthletes, setSelectedAthletes] = useState([]);
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/athletes")
      .then((response) => response.json())
      .then((data) => setAthletes(data))
      .catch((error) => console.error("Error fetching athletes:", error));
  }, []);

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableAthletes = filteredAthletes.filter(
    (athlete) =>
      !selectedAthletes.find((selected) => selected.id === athlete.id)
  );

  function handleAthleteSelect(athlete) {
    if (!selectedAthletes.find((selected) => selected.id === athlete.id)) {
      setSelectedAthletes([...selectedAthletes, athlete]);
      handleAddAttendance(athlete, { coach_name: "Placeholder Coach" }); // Pass a placeholder coach for now
    }
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleUndo(athlete) {
    setSelectedAthletes(
      selectedAthletes.filter((selected) => selected.id !== athlete.id)
    );
    handleRemoveAttendance(athlete, { coach_name: "Placeholder Coach" }); // Pass a placeholder coach for now
  }

  return (
    <div className="container my-4">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search Athlete"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {selectedAthletes.map((athlete) => (
        <div
          key={athlete.id}
          className="card mt-4"
          style={{ backgroundColor: "#d4edda" }}
        >
          <div className="card-body d-flex align-items-center">
            <img
              src="exampleImg.jpg"
              alt={athlete.name}
              className="img-fluid rounded-circle mr-3"
              style={{ width: "50px" }}
            />
            <h3 className="card-title mb-0 flex-grow-1">{athlete.name}</h3>
            <button
              className="btn btn-danger ml-auto"
              onClick={() => handleUndo(athlete)}
            >
              Undo
            </button>
          </div>
        </div>
      ))}
      <div
        className="list-group mt-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        {availableAthletes.map((athlete) => (
          <button
            key={athlete.id}
            className="list-group-item list-group-item-action"
            onClick={() => handleAthleteSelect(athlete)}
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.1)", // Very subtle red background
              color: "black",
            }}
          >
            {athlete.name}
          </button>
        ))}
      </div>
    </div>
  );
}
