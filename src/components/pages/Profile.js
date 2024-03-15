import React, {useEffect, useState} from "react";
import Navbar from "../Navbar";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/FirebaseUtils";
import "./Profile.css";
import profilePhoto from "../../images/ProfilePhoto.png";
import {
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

/**
 * The page that is displayed when the user clicks on the Profile tab in the nav bar.
 * Shows user information such as profile photo, name, email, age, bio, etc.
 * 
 * Has buttons to view Friends and Workout Logs pages.
 * 
 * @return returns the profile page
 */

//timeout incase there is trouble fetching data from database
const retryDelay = 1000; // 1 second delay between retries
const maxRetries = 5; // Maximum number of retries

/* 
Profile page that displays users information 
Also can see users friends and workout log from this page
*/
export const Profile = () => {
  const navigate = useNavigate();

  const currentUser = useAuth();
  const [retryCount, setRetryCount] = useState(0);

  // Check if currentUser exists before accessing its properties
  const photoURL = currentUser ? currentUser.photoURL : profilePhoto;
  const displayName = currentUser ? currentUser.displayName : 'Guest';
  const email = currentUser ? currentUser.email : 'guest@example.com';
  const[age, setAge] = useState("")
  const[fitnessGoals, setFitnessGoals] = useState("")
  const[bio, setBio] = useState("")
  const[favoriteWorkouts, setFavoriteWorkouts] = useState("")

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setRetryCount(0); // Reset retry count when the component mounts
    getData(); // Trigger getData when the component mounts
    getBio();
  }, [email]);

  //queries database for current users email, then displays their respective information on the page
  async function getData() {
    try {
      const q = query(collection(db, "aboutMe"), where("email", "==", currentUser.email));
      const docSnap = await getDocs(q);
      let user = [];
  
      docSnap.forEach(doc => {
        user.push({ ...doc.data(), id: doc.id });
      });
      if (user.length > 0) {
        setAge(user[0]['age'])
        setFavoriteWorkouts(user[0]['favoriteWorkouts'])
        setFitnessGoals(user[0]['fitnessGoals'])
      } else {
        setAge("Loading...")
        setFavoriteWorkouts("Loading...")
        setFitnessGoals("Loading...")
        console.log("User Data not available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  async function getBio() {
    try {
      const q = query(collection(db, "users"), where("email", "==", currentUser.email));
      const docSnap = await getDocs(q);
      let user = [];
      docSnap.forEach(doc => {
        user.push({ ...doc.data(), id: doc.id });
      });
      if (user.length > 0) {
        setBio(user[0]['bio'])
      } else {
      setBio("Loading...")
      console.log("Bio not available");
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            getBio();
          }, retryDelay);
        }  
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }  
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box"> 
          <div className="profile-header">
            <img src={photoURL} alt="Profile" className="profile-photo" />
            <h3>Welcome, {displayName}</h3>
            <p>Email: {email}</p>
            <p>Age: {age}</p> 
            <p>Favorite Workout: {favoriteWorkouts}</p> 
            <p>Goals: {fitnessGoals}</p> 
            <p>Bio: {bio}</p> 

          </div>
        </div>
        <div className="profile-actions">
          <Button onClick={() => navigate("/profile/friends")}> Friends </Button>
          <Button onClick={() => navigate("/profile/workoutlogs")}> Workout Log </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
