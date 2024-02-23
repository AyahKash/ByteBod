// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore"

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

//get database
export const db = getFirestore()
//collection reference:
export const colRef = collection(db, 'Users')
//gets collection data

getDocs(colRef)
  .then((snapshot)=>{
    let users = []
    snapshot.docs.forEach((doc)=>{
      users.push({...doc.data(), id:doc.id})
    })
    console.log(users)
  })
  .catch(err=>{
    console.log(err.message)
  })

  
// const analytics = getAnalytics(app);// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
