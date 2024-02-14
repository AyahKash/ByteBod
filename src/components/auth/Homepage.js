import React, { useState } from "react";
import Button from "../../components/Button"
import Logo from "../../images/temp.png"
import "./Homepage.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
          console.log(userCredential)
      }).catch((error)=>{
          console.log(error)
      })
  }
  return (
      <div className="Login">
        <h1> Welcome To ByteBod </h1>
        <img src={Logo}/>
        <h2> Join our community </h2>
        <form onSubmit={signIn}>
        <div className="Buttons">
        <input type="email" placeholder="Enter your email" value={email}
        onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="Enter your password" value={password}
        onChange={(e)=>setPassword(e.target.value)}></input>
        <Button className="loginbuttons" type="submit">Login</Button>
        </div>
        </form>
      </div>
    );
  }
  
  export default SignIn;