import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="logo-placeholder.png" // Replace with your logo URL
            alt="Logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          WSC Attendance
        </Link>
        <div className="d-flex ms-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tracking">
                Tracking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-people">
                Add People
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
