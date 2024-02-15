import React, { useState } from "react";
import {auth} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../components/Button"

const SignUp = () => {
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
        //todo sign in
    }
    return(
        <div className="sign-in-container">
            <form onSubmit={signUp}>
                <h3>Create your account</h3>
                <div className="create-account-buttons">
                <input type = "email" placeholder="Enter your email" value={email}
                onChange={(e)=>setEmail(e.target.value)}></input>
                <input type = "password" placeholder="Enter your email" value={password}
                onChange={(e)=>setPassword(e.target.value)}></input>
                </div>


                <Button className="loginbuttons" type="submit">Sign In</Button>

            </form>
        </div>
    )
}

export default SignUp;
