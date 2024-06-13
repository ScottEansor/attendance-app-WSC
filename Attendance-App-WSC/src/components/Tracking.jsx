import React, { useState, useEffect } from "react";

export default function Tracking({ attendance, selectedDate }) {
  const [date, setDate] = useState(selectedDate);
  const [selectedCoachId, setSelectedCoachId] = useState("");
  const [selectedAbsenceDate, setSelectedAbsenceDate] = useState("");
  const [athletes, setAthletes] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/athletes")
      .then((response) => response.json())
      .then((data) => setAthletes(data))
      .catch((error) => console.error("Error fetching athletes:", error));

    fetch("http://localhost:5000/api/coaches")
      .then((response) => response.json())
      .then((data) => setCoaches(data))
      .catch((error) => console.error("Error fetching coaches:", error));
  }, []);

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleCoachChange(event) {
    setSelectedCoachId(event.target.value);
  }

  function handleAbsenceDateChange(event) {
    setSelectedAbsenceDate(event.target.value);
  }

  const notPickedAthletes = athletes.filter((athlete) => {
    if (!attendance[date]) return true;
    return !Object.values(attendance[date])
      .flat()
      .find((a) => a.id === athlete.id);
  });

  const coachesWithAthletes = Object.keys(attendance[date] || {}).map(
    (coachName) => ({
      coachName,
      athletes: attendance[date][coachName],
    })
  );

  const missedMoreThanThreeDays = athletes.filter((athlete) => {
    let missedCount = 0;
    let consecutiveMissedDays = 0;
    for (const day in attendance) {
      const isPresent = Object.values(attendance[day])
        .flat()
        .find((a) => a.id === athlete.id);
      if (!isPresent) {
        consecutiveMissedDays += 1;
        if (consecutiveMissedDays >= 3) {
          missedCount = consecutiveMissedDays;
          break;
        }
      } else {
        consecutiveMissedDays = 0;
      }
    }
    return missedCount >= 3;
  });

  const coach = coaches.find((coach) => coach.id === +selectedCoachId);
  const selectedCoachAthletes =
    (attendance[date] && attendance[date][coach?.coach_name]) || [];

  const absentAthletesOnDate = athletes.filter((athlete) => {
    if (!attendance[selectedAbsenceDate]) return true;
    return !Object.values(attendance[selectedAbsenceDate])
      .flat()
      .find((a) => a.id === athlete.id);
  });

  return (
    <div className="container my-4">
      <h2>Athletes Who Missed 3 or More Consecutive Days</h2>
      <ul className="list-group mb-4">
        {missedMoreThanThreeDays.map((athlete) => (
          <li key={athlete.id} className="list-group-item">
            {athlete.name}
          </li>
        ))}
      </ul>

      <h2>Coaches and Their Athletes</h2>
      <div className="mb-4">
        <div className="form-group">
          <label htmlFor="coachSelect">Select Coach</label>
          <select
            id="coachSelect"
            className="form-control"
            value={selectedCoachId}
            onChange={handleCoachChange}
          >
            <option value="">Select a coach</option>
            {coaches.map((coach) => (
              <option key={coach.id} value={coach.id}>
                {coach.coach_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateSelect">Select Date</label>
          <input
            type="date"
            id="dateSelect"
            className="form-control"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        {coach && (
          <div>
            <h3>{coach.coach_name}</h3>
            <ul className="list-group">
              {selectedCoachAthletes.map((athlete) => (
                <li key={athlete.id} className="list-group-item">
                  {athlete.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h2>Athletes Absent on Selected Date</h2>
      <div className="form-group">
        <label htmlFor="absenceDateSelect">Select Date</label>
        <input
          type="date"
          id="absenceDateSelect"
          className="form-control"
          value={selectedAbsenceDate}
          onChange={handleAbsenceDateChange}
        />
      </div>
      <ul className="list-group">
        {absentAthletesOnDate.map((athlete) => (
          <li key={athlete.id} className="list-group-item">
            {athlete.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
