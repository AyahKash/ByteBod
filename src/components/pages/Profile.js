import React from "react";
import Navbar from "../Navbar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div>Profile Page</div>
      <Button onClick={() => navigate("/profile/friends")}> Friends </Button>
    </div>
  );
};
