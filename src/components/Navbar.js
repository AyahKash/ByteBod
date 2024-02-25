import React from "react";
import Logo from "../images/LogoInline.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  return (
    // For details on these Bootstrap classes: https://getbootstrap.com/docs/5.3/components/navbar/
    <nav className="navbar navbar-dark navbar-expand-sm">
      <div className="container-fluid">
        {/* Brand */}
        <div className="navbar-brand">
          <img src={Logo} height="30" alt="" />
        </div>
        {/* Links */}
        <ul className="navbar-nav">
          <li className="navbar-item">
            <Button className="nav-link" onClick={() => navigate("/homepage")}> Home </Button>
          </li>
          <li className="navbar-item">
            <Button className="nav-link" onClick={() => navigate("/profile")}> Profile </Button>
          </li>
          <li className="navbar-item">
            <Button className="nav-link" onClick={() => navigate("/settings")}> Settings </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
