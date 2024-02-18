import React, { useState } from "react";
import {auth} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import './SignUp.css'
import { useNavigate } from "react-router-dom";


/* Can't figure out how to get the pictures to fit in the input fields (was thinking they could be next to each input) 
also need to figure out how to connect name (and other information) to users email and password using firebase database*/


function SignUp(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //function for what to happen when sign in:
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
            console.log(userCredential)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <form onSubmit={signUp}>
            <div className="sign-in-container">
            <div className="header">
                <div className="text">Create an Account</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                 <img src="" alt="" />   
                 <input type="text" placeholder="Enter your name"/>
                </div>
                <div className="input">
                 <img src="" alt="" />   
                 <input type="email" placeholder="Enter your email" value={email}
                 onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="input">
                 <img src="" alt="" />   
                 <input type="password" placeholder="Enter your password" value={password}
                 onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className="forgot-password">Forget Password? <span>Click Here</span></div>
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

