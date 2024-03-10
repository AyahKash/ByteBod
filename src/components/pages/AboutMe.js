
import React, { useState, useEffect} from 'react';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/FirebaseUtils";
import "./AboutMe.css"; 
import profilePhoto from "../../images/ProfilePhoto.png";
import { addDoc, collection, query, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { db, auth } from '../../firebase';


export const AboutMe = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const [fitnessJourney, setFitnessJourney] = useState('');
  const [favoriteWorkouts, setFavoriteWorkouts] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [motivation, setMotivation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');

  // Check if currentUser exists before accessing its properties
  const photoURL = currentUser ? currentUser.photoURL : profilePhoto;
  const displayName = currentUser ? currentUser.displayName : 'Guest';
  const email = currentUser ? currentUser.email : 'guest@example.com';
  const bio = currentUser ? currentUser.bio : '';

  const postsCollectionRef = collection(db, "aboutMe");

    //first add user info to firebase
    const createPost = async (event) => {
      event.preventDefault();
  
      const userId = auth.currentUser.uid;
      const userPostQuery = query(postsCollectionRef, where("author.id", "==", userId));
      const userPostQuerySnapshot = await getDocs(userPostQuery);
  
      const newPostData = {
          fitnessJourney,
          favoriteWorkouts,
          id: userId,
          email: auth.currentUser.email,
          author: {
              name: auth.currentUser.displayName,
              photoUrl: auth.currentUser.photoURL
          },
          fitnessGoals,
          dateOfBirth,
          age,
      };
  
      try {
        if (userPostQuerySnapshot.docs.length > 0) {
            const existingPostId = userPostQuerySnapshot.docs[0].id;
            await updateDoc(doc(postsCollectionRef, existingPostId), {
                ...newPostData,
                // Add other fields you want to update here
            }, { merge: true });
            console.log("Updated existing post");
        } else {
            await addDoc(postsCollectionRef, newPostData);
            console.log("Added new post");
        }
    } catch (error) {
        console.log("Error updating/adding post to the database: ", error);
    }
          }; 

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

  useEffect(() => {
    setAge(calculateAge());
  }, [dateOfBirth]);


  return (
    <div>
      <Navbar />
      <form onSubmit={createPost}>
      <div className="AboutMe-container">
        <div className="AboutMe-box"> {/* Container for profile details */}
          <div className="AboutMe-header">
            <img src={photoURL} alt="Profile" className="profile-photo" />
            <h3>Customize your profile!</h3>
            <p>Email: {email}</p>
            <p>Bio: {bio}</p> 
            <p>
              Date of Birth:
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </p>
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
          <button type="submit">Submit Post</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default AboutMe;
