import React, { useState } from "react";
import {auth} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import './SignUp.css'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { updateUserProfile } from "./FirebaseUtils";

/**
 * Creates user in firebase authentication, adds user to firestore (name and email) and signs them in
 */

function SignUp(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorExists, setErrorExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //function for what to happen when sign in:
    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const options = {
                name : name,
            };              
            await updateProfile(user, { displayName: name });
            await updateUserProfile(user, email, options);
            console.log("successfully connected to firebase")
    
            // Sign into the account after creating a new account
            const signInCredential = await signInWithEmailAndPassword(auth, email, password); 
            console.log("successfully signed in")
            console.log("now waiting to navigate to homepage")
    
            // Navigate to the homepage
            navigate("/homepage");
            console.log("navigated to homepage success")

        } catch (error) {
            console.log(error);
            console.log("Error message:", error.message);
            console.log("Error Code:", error.code);
            setErrorExists(true);
            if (error.code === "auth/weak-password"){
                setErrorMessage("Password should be at least 6 characters!");
            }
            if (error.code === "auth/email-already-in-use"){
                setErrorMessage("Email already in use. Please login or use a different email.");
            }
            
        }
    };

    return(
        <form onSubmit={signUp}>
            <div className="sign-in-container">
            <div className="header">
                <div className="text">Create an Account</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div style={{border: errorExists && '2px solid red'}} className="input">
                 <img src="" alt="" />   
                 <input type="name" placeholder="Enter your name" value={name}
                 onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div style={{border: errorExists && '2px solid red'}} className="input">
                 <img src="" alt="" />   
                 <input type="email" placeholder="Enter your email" value={email}
                 onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div style={{border: errorExists && '2px solid red'}} className="input">
                 <img src="" alt="" />   
                 <input type="password" placeholder="Enter your password" value={password}
                 onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div>{errorExists && <h3>{errorMessage}</h3>}</div>
                <div className="submit-container">
                    <button type="submit" className="submit" >Sign Up</button>
                </div>
                <div className="back-button" onClick={() => navigate("/")}> Go Back </div>
            </div>
            </div>
        </form>

    )
}

export default SignUp;

