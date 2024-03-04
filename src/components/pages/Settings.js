import React from "react";
import Navbar from "../Navbar";
import "./Settings.css";
import AuthDetails from "../auth/AuthDetails";
import { useState, useEffect} from "react";
import profilePhoto from "../../images/ProfilePhoto.png";
import { useAuth, upload, updateUserProfile , deleteProfilePhoto} from "../auth/FirebaseUtils";
import Button from "../Button";

export const Settings = () => {

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(profilePhoto); //default photo is profilephoto
  const [photoURLWritten, setPhotoURLWritten] = useState(false)
  const [bio, setBio] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
      console.log("User email:", userEmail);
    }
  }, [currentUser]);


  function handleChange(e){  //updates state of photo with the file uploaded
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
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
  function removeImage(){
    setPhotoURLWritten(false);
    setPhotoURL(profilePhoto);
    currentUser.photoURL = profilePhoto;
  }

  return (
    //main div:
    <div>
     <div> <Navbar/> </div> 
    <div class="flex-container">
    <div class="profile_box">
      <img src={photoURL} alt = "Hello" className = "avatar"/>
      <div class="item"> <AuthDetails/> 
      Email: {currentUser ? currentUser.email : 'Loading...'}
      </div>
      <input class="item" type="file" onChange={handleChange}></input>
      <div class="button-container">
        <button class="upload" disabled={loading || !photo} onClick={handleClick}>Upload</button>
        <button onClick={null} class="upload">Remove Profile Picture</button>
      </div>
    </div>
    <div class="info_box">
     <div> Personal Information</div> 
     <div class="bio-section">
    <div>Bio:</div>
    <textarea class="input-field larger-input" placeholder="Enter your bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
    <button onClick={assignBio} class="bottom-left-button">Save Bio</button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Settings;