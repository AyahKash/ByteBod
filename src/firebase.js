// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
<<<<<<< HEAD
    

    
    const firebaseConfig = {
    apiKey: "AIzaSyDG3PBDHtIiQfb7mNqAoD6rx1EMN7C8lOI",
    authDomain: "bytebod-9d1cf.firebaseapp.com",
    projectId: "bytebod-9d1cf",
    storageBucket: "bytebod-9d1cf.appspot.com",
    messagingSenderId: "545880527544",
    appId: "1:545880527544:web:9d4e618b4e5f017da09a4d"
    };
    
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const storage = getStorage();
    export const db = getFirestore();  //get database
    
=======
>>>>>>> cac3dd1aafc21381560242a5c652f0c53e535c0f
