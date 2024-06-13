import React, { useState } from "react";

export default function AddPeople() {
  const [newAthlete, setNewAthlete] = useState("");
  const [newCoach, setNewCoach] = useState("");

  function handleAthleteChange(event) {
    setNewAthlete(event.target.value);
  }

  function handleCoachChange(event) {
    setNewCoach(event.target.value);
  }

  function handleAddAthlete() {
    if (
      newAthlete.trim() &&
      window.confirm("Are you sure you want to add this athlete?")
    ) {
      fetch("http://localhost:5000/api/athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newAthlete }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Athlete added:", data);
          setNewAthlete("");
        })
        .catch((error) => console.error("Error adding athlete:", error));
    }
  }

  function handleAddCoach() {
    if (
      newCoach.trim() &&
      window.confirm("Are you sure you want to add this coach?")
    ) {
      fetch("http://localhost:5000/api/coaches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCoach }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Coach added:", data);
          setNewCoach("");
        })
        .catch((error) => console.error("Error adding coach:", error));
    }
  }

  return (
    <div className="container my-4">
      <h2>Add New Athlete or Coach</h2>
      <div className="form-group">
        <label htmlFor="newAthlete">Add Athlete</label>
        <input
          type="text"
          id="newAthlete"
          className="form-control"
          value={newAthlete}
          onChange={handleAthleteChange}
          placeholder="Enter athlete name"
        />
        <button className="btn btn-primary mt-2" onClick={handleAddAthlete}>
          Add Athlete
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="newCoach">Add Coach</label>
        <input
          type="text"
          id="newCoach"
          className="form-control"
          value={newCoach}
          onChange={handleCoachChange}
          placeholder="Enter coach name"
        />
        <button className="btn btn-primary mt-2" onClick={handleAddCoach}>
          Add Coach
        </button>
      </div>
    </div>
  );
}
