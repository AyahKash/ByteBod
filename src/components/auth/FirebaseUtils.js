import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth, db, storage} from "../../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"


/**
 * Custom hook for monitoring and returning the current authenticated user.
 * It listens for changes in the user's authentication state and updates the
 * `currentUser` state accordingly.
 * 
 * @returns {Firebase.User | undefined} The currently authenticated user object or `undefined` if no user is logged in.
 */
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();
  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub;
  }, [])
  return currentUser;
}

/**
 * Updates the user's profile information in Firestore and potentially other profile fields.
 * 
 * @param {Firebase.User} user The current user object.
 * @param {string} email The user's email to update.
 * @param {Object} options Additional profile options to update (e.g., displayName).
 */
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


/**
 * Uploads an image to Firebase Storage under the 'profile_photos' directory with a name
 * based on the current user's displayName. After the upload, it updates the user's profile
 * with the new photo URL and signals the completion of the upload process.
 * 
 * @param {File} file The file object to upload.
 * @param {Firebase.User} currentUser The current authenticated user object.
 * @param {Function} setLoading A function to update the loading state in the UI.
 */
export async function upload(file, currentUser, setLoading){ 
  const fileRef = ref(storage, 'profile_photos/'+ currentUser.displayName + '.png'); //hardcoding .png currently, can change this //need to create unique hash for photos
  setLoading(true);
  await uploadBytes(fileRef, file);
  const photoUrl = await getDownloadURL(fileRef);
  await updateProfile(currentUser, {photoURL: photoUrl});
  setLoading(false);
  alert("Uploaded picture!");
  window.location.reload(false);
}