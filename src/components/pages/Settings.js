import React from "react";
import Navbar from "../Navbar";
import "./Settings.css";
import AuthDetails from "../auth/AuthDetails";
import { useState, useEffect} from "react";
import profilePhoto from "../../images/ProfilePhoto.png";
import { useAuth, upload, updateUserProfile , deleteProfilePhoto} from "../auth/FirebaseUtils";
import { updatePassword } from 'firebase/auth';

import { useNavigate } from "react-router-dom"; // ADDED THIS ANUSHKA

export const Settings = () => {

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(profilePhoto); //default photo is profilephoto
  const [photoURLWritten, setPhotoURLWritten] = useState(false)
  const [bio, setBio] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoChosen, setPhotoChosen] = useState(false); 

  const navigate = useNavigate(); // ADDED THIS ANUSHKA



 //sets user email to display it
  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
      console.log("User email:", userEmail);
    }
  }, [currentUser]);

  function handleChange(e){  //updates state of photo with the file uploaded
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
      setPhotoChosen(true)
    }
  }
  function handleClick(){ //calls upload function 
    upload(photo, currentUser, setLoading);
  }

  //this will setPhotoURLWritten to true if a picture is uploaded
  useEffect(()=>{
    if(currentUser && currentUser.photoURL){
      setPhotoURLWritten(true)
      console.log("Updated photoURL in effect:", currentUser.photoURL);
    }
  }, [currentUser]);

  //connects profile  to firestore database, now can display it from anywhere (with usercredential)
  useEffect(()=>{
    const assignPhotoURLToProfile = async () => {
      if(photoURLWritten){
        const options = {
          photoURL:photoURL,
        };
        try{
          await updateUserProfile(currentUser, currentUser.email, options);
          setPhotoURL(currentUser.photoURL);
          console.log("Updated photoURL in this effect: ", currentUser.photoURL);
        }
        catch(error){
          console.error("Error updating profile: ", error);
        }
      }
    };
    assignPhotoURLToProfile();
  }, [photoURL, photoURLWritten, currentUser]);

  
  async function assignBio (){
    try {
      const options = {
        bio: bio,
      };              
      await updateUserProfile(currentUser, currentUser.email, options);  
      alert("Bio updated!")
    } catch (error) {
      console.log("Trouble updating bio, error: ", error)
    }
  }

  function resetPassword() {
    const user = currentUser;
    const newPassword = password;
    if(password===confirmPassword){
    updatePassword(user, newPassword).then(() => { 
        console.log('Update SuccessFul');
        alert("Password Reset")
 
    }).catch((error) => {
      console.log("ResetPass Eror", error)
    });
  }
  else{
    alert("Paswords didn't match")
  }
}


  return (
    //main div:
    <div>
      <div> <Navbar/> </div> 
      
      <div class="flex-container">
        

        <div class="profile_box">
          <img src={photoURL} alt = "Hello" className = "avatar"/>
          <div class="item"> <AuthDetails/> 
            <div className = "user-email"> 
              Email: {currentUser ? currentUser.email : 'Loading...'}
            </div>
            <div className = "user-bio"> 
              Bio: {currentUser ? bio : 'Loading...'}
            </div>
            {/* added this */}
        <div class="about_me-actions">
            
        <button class="about_me" onClick={() => navigate("/AboutMe")}>About Me</button>

          </div>
          <input class="item2" type="file" onChange={handleChange}></input>
          </div>
          <div class="button-container">
            <button class="buttons" disabled={loading || !photo} onClick={handleClick} style={{backgroundColor: photoChosen === true  ?  "#027148" : "#808080" }}>Upload</button>
            <button onClick={null} class="buttons">Remove Profile Picture</button>
          </div>
        </div>
        <div class="info_box">
          <div class="font-header"> Personal Information</div> 
          <div class="bio-section">
            <div class="font">Bio: </div>
            <textarea class="input-field larger-input" placeholder="Enter your bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            <button onClick={assignBio} class="bottom-left-button">Save Bio</button>
          </div>
          <div class="bio-section">
            <div class="font">Reset Password:</div>
            <input class="pass-input-field" type="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input class="pass-input-field" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <button class="buttons" onClick={resetPassword}>Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;