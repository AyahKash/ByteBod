
import React, { useState } from 'react';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/FirebaseUtils";
import "./AboutMe.css"; 
import profilePhoto from "../../images/ProfilePhoto.png";

export const AboutMe = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const [fitnessJourney, setFitnessJourney] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [motivation, setMotivation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Check if currentUser exists before accessing its properties
  const photoURL = currentUser ? currentUser.photoURL : profilePhoto;
  const displayName = currentUser ? currentUser.displayName : 'Guest';
  const email = currentUser ? currentUser.email : 'guest@example.com';
  const bio = currentUser ? currentUser.bio : '';

  // Function to calculate age based on date of birth
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  return (
    <div>
      <Navbar />
      <div className="AboutMe-container">
        <div className="AboutMe-box"> {/* Container for profile details */}
          <div className="AboutMe-header">
            <img src={photoURL} alt="Profile" className="profile-photo" />
            <h3>Welcome, {displayName}</h3>
            <p>Email: {email}</p>
            <p>Bio: {bio}</p> 
            <label>
              Date of Birth:
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
            <p>Age: {calculateAge()}</p>
       
          </div>
          <div className="AboutMe-section">
            <div className="AboutMeinfo-box">
              <div className="fitness-journey">
              <h6>My Fitness Journey</h6>
                <textarea 
                
                  placeholder="My Fitness Journey"
                  value={fitnessJourney}
                  onChange={(e) => setFitnessJourney(e.target.value)}
                />
              </div>
              <div className="favorite-workouts">
              <h6>My Favorite Workouts</h6>
                <textarea 
                  placeholder="Favorite Workouts"
                  value={favoriteWorkouts}
                  onChange={(e) => setFavoriteWorkouts(e.target.value)}
                />
              </div>
            </div>
            <div className="AboutMeinfo-box">
              <div className="fitness-goals">
              <h6>My Fitness Goals</h6>
                <textarea 
                  placeholder="Fitness Goals"
                  value={fitnessGoals}
                  onChange={(e) => setFitnessGoals(e.target.value)}
                />
              </div>
              <div className="motivation">
              <h6>My Motivation</h6>
                <textarea 
                  placeholder="Motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
