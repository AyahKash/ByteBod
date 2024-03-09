import React from "react";
import Logo from "../images/LogoInline.png";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import {signOut} from 'firebase/auth'
import {auth} from "../firebase";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userSignOut = () => {
    signOut(auth).then(()=>{
        navigate('/')
        console.log('sign out successful');
    }).catch(error=>console.log(error))
  }

  const showSearchBar = location.pathname === "/homepage";

return (
    // For details on these Bootstrap classes: https://getbootstrap.com/docs/5.3/components/navbar/
    <nav className="navbar navbar-dark navbar-expand-sm">
      <div className="container-fluid">
        {/* Brand */}
        <div className="navbar-brand">
          <img src={Logo} height="30" alt="" />
        </div>
        {/* Links */}
        {showSearchBar && <SearchBar />}
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
          <li className="navbar-item">
            <Button className="nav-link" onClick={userSignOut}> Sign Out </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
