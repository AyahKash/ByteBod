import React from "react";
import Navbar from "../Navbar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/FirebaseUtils";
import "./Profile.css";
import profilePhoto from "../../images/ProfilePhoto.png";
import {doc, getDoc} from "firebase/firestore"
export const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();

  // Check if currentUser exists before accessing its properties
  const photoURL = currentUser ? currentUser.photoURL : profilePhoto;
  const displayName = currentUser ? currentUser.displayName : 'Guest';
  const email = currentUser ? currentUser.email : 'guest@example.com';
  const bio = currentUser ? currentUser.bio : '';
    
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box"> {/* Container for profile details */}
          <div className="profile-header">
            <img src={photoURL} alt="Profile" className="profile-photo" />
            <h3>Welcome, {displayName}</h3>
            <p>Email: {email}</p>
            <p>Age: {bio}</p> 
            <p>Favorite Type of Workout: {bio}</p> 
            <p>Goals: {bio}</p> 
            <p>Bio: {bio}</p> 
            <p>Bio: {bio}</p> 

          </div>
        </div>
        {/* <AuthDetails /> */}
        <div className="profile-actions">
          <Button onClick={() => navigate("/profile/friends")}> Friends </Button>
          <Button onClick={() => navigate("/profile/workoutlog")}> Workout Log </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
