import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRsn8lIxUrwUIU0_6bueVT8CETEEXEAFE",
  authDomain: "bytebod-2c156.firebaseapp.com",
  projectId: "bytebod-2c156",
  storageBucket: "bytebod-2c156.appspot.com",
  messagingSenderId: "29801452651",
  appId: "1:29801452651:web:5cd15bf10c744c49a54d2e",
  measurementId: "G-JXL7R52W0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //can import and use this in other files of our project
const analytics = getAnalytics(app);
const firestore = getFirestore(app)