import React, { useState } from "react";
import Button from "../Button"
import Logo from "../../images/temp.png"
import "./SignIn.css"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorExists, setErrorExists] = useState(false);
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
          console.log(userCredential)
          navigate("/homepage");
      }).catch((error)=>{
          console.log(error);
          console.log(error.message);
          console.log("Error Code", error.code);
          setErrorExists(true);
      })
  }
  return (
      <div className="Login">
        <h1> Welcome To ByteBod </h1>
        <img src={Logo}/>
        <h2> Join our community </h2>
        <div className="Buttons">
        <form onSubmit={signIn}>
        <input type="email" placeholder="Enter your email" value={email}
        onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="Enter your password" value={password}
        onChange={(e)=>setPassword(e.target.value)}></input>
        <Button className="loginbuttons" type="submit">Login</Button>
        </form>
        <Button className="signupbutton" onClick={() => navigate("/signup")}> Sign Up </Button>
        <div>{errorExists && <p>Error: Invalid email or password, or account is not registered.</p>}</div>
        </div>
      </div>
    );
  }
  
  export default SignIn;