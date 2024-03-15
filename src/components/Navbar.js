import React from "react";
import Logo from "../images/LogoInline.png";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import {signOut} from 'firebase/auth'
import {auth} from "../firebase";

/** 
*Navigation bar that is implemented utilizing bootstrap
*/
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Manage user sign out 
  const userSignOut = () => {
    signOut(auth).then(()=>{
        navigate('/')
        console.log('sign out successful');
    }).catch(error=>console.log(error))
  }

  // Ensure search bar appears only on homepage 
  const showSearchBar = location.pathname === "/homepage";

  return (
    <nav className="navbar navbar-dark navbar-expand-sm py-2">
      <div className="container-fluid">
        {/* Brand */}
        <div className="navbar-brand">
          <img src={Logo} height="30" alt="" onClick={() => navigate("/homepage")} /> 
        </div>
        {/* Links */}
        {showSearchBar && <SearchBar/>}
        <ul className="navbar-nav">
          <li className="navbar-item">
            <Button className="nav-link" onClick={() => navigate("/homepage")}> Home </Button>
          </li>
          <li className="navbar-item">
            <Button className="nav-link" onClick={() => navigate("/friendsfeed")}> Friends Feed </Button>
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
