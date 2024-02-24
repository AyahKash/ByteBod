// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG3PBDHtIiQfb7mNqAoD6rx1EMN7C8lOI",
  authDomain: "bytebod-9d1cf.firebaseapp.com",
  projectId: "bytebod-9d1cf",
  storageBucket: "bytebod-9d1cf.appspot.com",
  messagingSenderId: "545880527544",
  appId: "1:545880527544:web:9d4e618b4e5f017da09a4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
