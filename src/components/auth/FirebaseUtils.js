import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage} from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { addDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

//DOC WITH ALL THE FIREBASE/FIRESTORE FUNCTIONS?


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
export const updateUserProfile = async (user, name, email, additionalData) => {
  try {
    // Update user profile with name
    await updateProfile(user, { displayName: name });

    const userData = {
        email: email,
        name: name,
        age: additionalData.age || null, //added to the profile later
        bio: additionalData.bio || null,
        profilePicture : additionalData.profilePicture || null,
    }
    // Use setDoc to add user data to the "users" collection
    await setDoc(doc(db, 'users', user.uid), userData, { merge: true });

    console.log("User profile updated and data written to the database successfully");
  } catch (error) {
    console.error("Error updating user profile and writing to the database:", error);
  }
};

// //adding post on firestore this is not working...
// export const createPost = async (title, postText, author) => {
//   const postsCollectionRef = doc(db, 'posts');
//   const newPostData = { 
//     title, 
//     postText, 
//     author,
//   };

//   try {
//     await addDoc(postsCollectionRef, newPostData);
//     console.log("Added post to database");
//   } catch (error) {
//     console.log("Error adding post to database: ", error);
//     throw error;
//   }
// };


// Storage Functions (maybe move to a new file?)
//async <-> API calls
//uploading files --> await inside async (not instantaneous)

//uploads a file to storage on firebase:
export async function upload(file, currentUser, setLoading){ 
  const fileRef = ref(storage, currentUser.displayName + '.png'); //hardcoding .png currently, can change this
  setLoading(true);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  await updateProfile(currentUser, {photoURL});
  setLoading(false);
  alert("Uploaded picture!");
}