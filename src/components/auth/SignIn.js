import React, { useState } from "react";
import Button from "../Button"
import Logo from "../../images/LogoWhiteLetters.png"
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
  const handleReset = ()=>{
    navigate("/reset");
}
  return (
      <div className="Login">
        <h1> Welcome To <img className="Logo" src={Logo}/> </h1>
        <h2> Join our community </h2>
        <div className="Container">
          <form onSubmit={signIn}>
            <div>
              <input type="email" placeholder="Enter your email" value={email}
              onChange={(e)=>setEmail(e.target.value)}> 
              </input>
            </div>
            <div>
              <input type="password" placeholder="Enter your password" value={password}
              onChange={(e)=>setPassword(e.target.value)}>
              </input>
            </div>
            <div><Button id="loginbutton" type="submit">Login</Button></div> <br/>
            <Button id="signupbutton" onClick={() => navigate("/signup")}> Sign Up </Button>
            <div className="forgot-password">Forget Password? <span onClick={handleReset}>Click Here</span></div> 
          </form>
        <div>{errorExists && <p>Error: Invalid email or password, or account is not registered.</p>}</div>
        </div>
      </div>
    );
  }
  
  export default SignIn;