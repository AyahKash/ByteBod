import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage} from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"

//DOC WITH ALL THE FIREBASE/FIRESTORE FUNCTIONS

//returns current user object:
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub;
  }, [])
  return currentUser;
}

//function to update user data on firestore 
export const updateUserProfile = async (user, email, options = {}) => {
  try {
    // Update user profile with name
    const userData = {
        email: email,
    }
    const updatedUserData = { ...userData, ...options };
    // Use setDoc to add user data to the "users" collection
    await setDoc(doc(db, 'users', user.uid), updatedUserData, { merge: true });

    console.log("User profile updated and data written to the database successfully");
  } catch (error) {
    console.error("Error updating user profile and writing to the database:", error);
  }
};


//uploads an imshr to storage on firebase:
export async function upload(file, currentUser, setLoading){ 
  const fileRef = ref(storage, 'profile_photos/'+ currentUser.displayName + '.png'); //hardcoding .png currently, can change this //need to create unique hash for photos
  setLoading(true);
  await uploadBytes(fileRef, file);
  const photoUrl = await getDownloadURL(fileRef);
  console.log("photoURL" , photoUrl)
  await updateProfile(currentUser, {photoURL: photoUrl});
  setLoading(false);
  alert("Uploaded picture!");
  window.location.reload(false);
}