import React from "react";
import Navbar from "../Navbar";
import "./Settings.css";
import AuthDetails from "../auth/AuthDetails";
import { useState, useEffect} from "react";
import profilePhoto from "../../images/ProfilePhoto.png";
import { useAuth, upload, updateUserProfile , deleteProfilePhoto} from "../auth/FirebaseUtils";

export const Settings = () => {

  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(profilePhoto); //default photo is profilephoto
  const [photoURLWritten, setPhotoURLWritten] = useState(false)
  const [bio, setBio] = useState(null);

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
      console.log("Updated photoURL:", currentUser.photoURL);
    }
  }, [currentUser]);

  //connects profile picture to firestore database, now can display it from anywhere (with usercredential)
  useEffect(()=>{
    const assignPhotoURLToProfile = async () => {
      if(photoURLWritten){
        const options = {
          photoURL:photoURL,
        };
        try{
          await updateUserProfile(currentUser, currentUser.email, options);
          setPhotoURL(currentUser.photoURL);
          console.log("Updated photoURL: ", currentUser.photoURL);
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

  return (
    <div>
      <Navbar />
      <div> <AuthDetails/> </div>
      <div className="container">
      <h3 className="Header"> Edit Profile </h3>
      <div className="inputs">
        <div className="profile_picture">
          <input type="file" onChange={handleChange}></input>
          <button disabled={loading||!photo} onClick={handleClick}>Upload</button>
          <img src={photoURL} alt = "Hello" className = "avatar"/>
          <button onClick={null}>Remove Profile Photo</button> 
        </div>
      </div>
      <div>        <input type="bio" placeholder="Enter your bio" value={bio}
                 onChange={(e)=>setBio(e.target.value)}></input>
          <button onClick={assignBio}>Save Bio</button>
</div>
      </div>
    </div>
  );
};

export default Settings;