import React from "react";
import Navbar from "../Navbar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import AuthDetails from "../auth/AuthDetails";
import { useState } from "react";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <AuthDetails/>
      <div>Profile Page</div>
      <Button onClick={() => navigate("/profile/friends")}> Friends </Button>
      <Button onClick={() => navigate("/profile/workoutlog")}> Workout Log </Button>

    </div>
  );
};

export default Profile;
