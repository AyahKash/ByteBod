import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  return (
    // For details on these Bootstrap classes: https://getbootstrap.com/docs/5.3/components/navbar/
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        {/* Brand */}
        <div className="navbar-brand"> ByteBod </div>
        {/* Links */}
        <ul className="navbar-nav">
          <li className="navbar-item">
            <a className="nav-link" onClick={() => navigate("/homepage")}> Home </a>
          </li>
          <li className="navbar-item">
            <a className="nav-link" onClick={() => navigate("/profile")}> Profile </a>
          </li>
          <li className="navbar-item">
            <a className="nav-link" onClick={() => navigate("/settings")}> Settings </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
