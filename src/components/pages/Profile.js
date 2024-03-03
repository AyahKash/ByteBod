import React from "react";
import Navbar from "../Navbar";
import "./Profile.css";
import AuthDetails from "../auth/AuthDetails";
import { useState } from "react";

export const Profile = () => {
  const [bio, setBio] = useState("")
  return (
    <div>
      <Navbar />
      <AuthDetails/>
      <div>Profile Page</div>
      <div className="inputs">
        <div className="input">
          <img src="" alt="" />   
          <input type="name" placeholder="Enter your bio" value={bio}
          onChange={(e)=>setBio(e.target.value)}></input>
        </div>
    </div>
    </div>
  );
};

export default Profile;
